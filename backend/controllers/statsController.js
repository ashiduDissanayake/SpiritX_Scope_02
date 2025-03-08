const db = require('../config/db');
const calculations = require('../utils/calculations');

// Get tournament summary stats
exports.getTournamentSummary = async (req, res) => {
  try {
    // Get total runs
    const [runsResult] = await db.execute('SELECT SUM(total_runs) as totalRuns FROM players');
    const totalRuns = runsResult[0].totalRuns || 0;
    
    // Get total wickets
    const [wicketsResult] = await db.execute('SELECT SUM(wickets) as totalWickets FROM players');
    const totalWickets = wicketsResult[0].totalWickets || 0;
    
    // Get highest run scorer
    const [highestRunScorer] = await db.execute(`
      SELECT id, name, university, total_runs 
      FROM players 
      ORDER BY total_runs DESC 
      LIMIT 1
    `);
    
    // Get highest wicket taker
    const [highestWicketTaker] = await db.execute(`
      SELECT id, name, university, wickets 
      FROM players 
      ORDER BY wickets DESC 
      LIMIT 1
    `);
    
    res.json({
      totalRuns,
      totalWickets,
      highestRunScorer: highestRunScorer[0] || null,
      highestWicketTaker: highestWicketTaker[0] || null
    });
  } catch (error) {
    console.error('Error fetching tournament summary:', error);
    res.status(500).json({ message: 'Failed to fetch tournament summary' });
  }
};

// Get detailed player stats for all players
exports.getAllPlayerStats = async (req, res) => {
  try {
    const [players] = await db.execute('SELECT * FROM players');
    
    // Calculate all stats for each player
    const playersWithStats = players.map(player => calculations.getPlayerFullStats(player));
    
    res.json(playersWithStats);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    res.status(500).json({ message: 'Failed to fetch player stats' });
  }
};