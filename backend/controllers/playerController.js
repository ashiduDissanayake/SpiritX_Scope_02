const db = require('../config/db');
const calculations = require('../utils/calculations');

// Get all players with basic info
exports.getAllPlayers = async (req, res) => {
  try {
    const [players] = await db.execute(`
      SELECT id, name, university, category, total_runs, wickets
      FROM players
    `);
    
    res.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ message: 'Failed to fetch players' });
  }
};

// Get player details by ID with all stats
exports.getPlayerById = async (req, res) => {
  try {
    const [players] = await db.execute(
      'SELECT * FROM players WHERE id = ?', 
      [req.params.id]
    );
    
    if (players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Calculate additional stats
    const playerWithStats = calculations.getPlayerFullStats(players[0]);
    
    res.json(playerWithStats);
  } catch (error) {
    console.error('Error fetching player details:', error);
    res.status(500).json({ message: 'Failed to fetch player details' });
  }
};

// Create a new player (Admin only)
exports.createPlayer = async (req, res) => {
  try {
    const { 
      name, university, category, total_runs, balls_faced,
      innings_played, wickets, overs_bowled, runs_conceded 
    } = req.body;
    
    if (!name || !university || !category) {
      return res.status(400).json({ message: 'Required fields missing' });
    }
    
    const [result] = await db.execute(
      `INSERT INTO players 
       (name, university, category, total_runs, balls_faced, innings_played, 
        wickets, overs_bowled, runs_conceded)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, university, category, total_runs || 0, balls_faced || 0, innings_played || 0,
       wickets || 0, overs_bowled || 0, runs_conceded || 0]
    );
    
    res.status(201).json({ 
      message: 'Player created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating player:', error);
    res.status(500).json({ message: 'Failed to create player' });
  }
};

// Update player (Admin only)
exports.updatePlayer = async (req, res) => {
  try {
    const { 
      name, university, category, total_runs, balls_faced,
      innings_played, wickets, overs_bowled, runs_conceded 
    } = req.body;
    
    const playerId = req.params.id;
    
    // Check if player exists
    const [players] = await db.execute('SELECT * FROM players WHERE id = ?', [playerId]);
    
    if (players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Update player info
    await db.execute(
      `UPDATE players SET
       name = ?, university = ?, category = ?, total_runs = ?, balls_faced = ?,
       innings_played = ?, wickets = ?, overs_bowled = ?, runs_conceded = ?,
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, university, category, total_runs, balls_faced,
       innings_played, wickets, overs_bowled, runs_conceded, playerId]
    );
    
    res.json({ message: 'Player updated successfully' });
  } catch (error) {
    console.error('Error updating player:', error);
    res.status(500).json({ message: 'Failed to update player' });
  }
};

// Delete player (Admin only)
exports.deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.id;
    
    // Check if player exists
    const [players] = await db.execute('SELECT * FROM players WHERE id = ?', [playerId]);
    
    if (players.length === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Delete player
    await db.execute('DELETE FROM players WHERE id = ?', [playerId]);
    
    res.json({ message: 'Player deleted successfully' });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({ message: 'Failed to delete player' });
  }
};