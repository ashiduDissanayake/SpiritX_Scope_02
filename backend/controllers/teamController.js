const db = require('../config/db');
const calculations = require('../utils/calculations');

const INITIAL_BUDGET = 9000000;

// Helper to get user's team ID or create new team
async function getUserTeamId(userId) {
  // Check if user already has a team
  const [teams] = await db.execute(
    'SELECT id FROM teams WHERE user_id = ?',
    [userId]
  );
  
  if (teams.length > 0) {
    return teams[0].id;
  }
  
  // Create new team if none exists
  const [result] = await db.execute(
    'INSERT INTO teams (user_id) VALUES (?)',
    [userId]
  );
  
  return result.insertId;
}

// Get current user's team
exports.getUserTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get team ID or create new team
    const teamId = await getUserTeamId(userId);
    
    // Get team players
    const [rows] = await db.execute(`
      SELECT p.*, tp.id as team_player_id
      FROM players p
      JOIN team_players tp ON p.id = tp.player_id
      WHERE tp.team_id = ?
    `, [teamId]);
    
    // Calculate stats for each player
    const playersWithStats = rows.map(player => calculations.getPlayerFullStats(player));
    
    // Calculate team points
    const totalPoints = playersWithStats.reduce((sum, player) => sum + player.points, 0);
    
    // Calculate budget spent
    const budgetSpent = playersWithStats.reduce((sum, player) => sum + player.value, 0);
    const remainingBudget = INITIAL_BUDGET - budgetSpent;
    
    res.json({
      teamId,
      players: playersWithStats,
      totalPlayers: playersWithStats.length,
      totalPoints: playersWithStats.length === 11 ? totalPoints : null, // Only show points when 11 players selected
      budgetSpent,
      remainingBudget
    });
  } catch (error) {
    console.error('Error fetching user team:', error);
    res.status(500).json({ message: 'Failed to fetch team' });
  }
};

// Add player to user's team
exports.addPlayerToTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const playerId = req.params.playerId;
    
    // Verify player exists
    const [players] = await db.execute('SELECT * FROM players WHERE id = ?', [playerId]);
    if (players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Get user team ID
    const teamId = await getUserTeamId(userId);
    
    // Check if player is already in team
    const [existingPlayers] = await db.execute(
      'SELECT * FROM team_players WHERE team_id = ? AND player_id = ?',
      [teamId, playerId]
    );
    
    if (existingPlayers.length > 0) {
      return res.status(400).json({ message: 'Player already in team' });
    }
    
    // Count current team size
    const [teamCount] = await db.execute(
      'SELECT COUNT(*) as count FROM team_players WHERE team_id = ?',
      [teamId]
    );
    
    if (teamCount[0].count >= 11) {
      return res.status(400).json({ message: 'Team already has 11 players' });
    }
    
    // Calculate total budget spent
    const [teamPlayers] = await db.execute(`
      SELECT p.* FROM players p
      JOIN team_players tp ON p.id = tp.player_id
      WHERE tp.team_id = ?
    `, [teamId]);
    
    const teamPlayersWithStats = teamPlayers.map(player => calculations.getPlayerFullStats(player));
    const currentSpent = teamPlayersWithStats.reduce((sum, player) => sum + player.value, 0);
    
    // Calculate new player's value
    const playerWithStats = calculations.getPlayerFullStats(players[0]);
    
    // Check budget
    if (currentSpent + playerWithStats.value > INITIAL_BUDGET) {
      return res.status(400).json({ message: 'Not enough budget to add this player' });
    }
    
    // Add player to team
    await db.execute(
      'INSERT INTO team_players (team_id, player_id) VALUES (?, ?)',
      [teamId, playerId]
    );
    
    res.status(201).json({ 
      message: 'Player added to team',
      player: playerWithStats,
      remainingBudget: INITIAL_BUDGET - (currentSpent + playerWithStats.value)
    });
  } catch (error) {
    console.error('Error adding player to team:', error);
    res.status(500).json({ message: 'Failed to add player to team' });
  }
};

// Remove player from team
exports.removePlayerFromTeam = async (req, res) => {
  try {
    const userId = req.user.id;
    const teamPlayerId = req.params.teamPlayerId;
    
    // Get user team
    const [teams] = await db.execute(
      'SELECT id FROM teams WHERE user_id = ?',
      [userId]
    );
    
    if (teams.length === 0) {
      return res.status(404).json({ message: 'Team not found' });
    }
    
    const teamId = teams[0].id;
    
    // Check if team player exists and belongs to user
    const [teamPlayers] = await db.execute(
      'SELECT * FROM team_players WHERE id = ? AND team_id = ?',
      [teamPlayerId, teamId]
    );
    
    if (teamPlayers.length === 0) {
      return res.status(404).json({ message: 'Player not in team' });
    }
    
    // Remove player from team
    await db.execute(
      'DELETE FROM team_players WHERE id = ?',
      [teamPlayerId]
    );
    
    res.json({ message: 'Player removed from team' });
  } catch (error) {
    console.error('Error removing player from team:', error);
    res.status(500).json({ message: 'Failed to remove player from team' });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    // This query gets all teams with 11 players
    const [teams] = await db.execute(`
      SELECT 
        u.id as user_id, 
        u.username,
        t.id as team_id,
        COUNT(tp.id) as player_count
      FROM 
        users u
      JOIN 
        teams t ON u.id = t.user_id
      LEFT JOIN 
        team_players tp ON t.id = tp.team_id
      GROUP BY 
        u.id, t.id
      HAVING 
        player_count = 11
    `);
    
    // Calculate points for each complete team
    const leaderboard = [];
    
    for (const team of teams) {
      // Get team players
      const [players] = await db.execute(`
        SELECT p.* FROM players p
        JOIN team_players tp ON p.id = tp.player_id
        WHERE tp.team_id = ?
      `, [team.team_id]);
      
      const playersWithStats = players.map(player => calculations.getPlayerFullStats(player));
      const totalPoints = playersWithStats.reduce((sum, player) => sum + player.points, 0);
      
      leaderboard.push({
        userId: team.user_id,
        username: team.username,
        teamId: team.team_id,
        totalPoints: totalPoints
      });
    }
    
    // Sort by points (descending)
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints);
    
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};