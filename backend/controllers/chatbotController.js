const db = require('../config/db');
const { genAI } = require('../config/gemini');
const calculations = require('../utils/calculations');

// Helper: Get player data for chat context
async function getPlayerData() {
  const [players] = await db.execute(`
    SELECT id, name, university, category, total_runs, balls_faced, 
           innings_played, wickets, overs_bowled, runs_conceded
    FROM players
  `);
  
  // Calculate all stats for all players
  return players.map(player => {
    const ballsBowled = player.overs_bowled * 6;
    const battingStrikeRate = player.balls_faced > 0 
      ? (player.total_runs / player.balls_faced) * 100 
      : 0;
      
    const battingAverage = player.innings_played > 0 
      ? player.total_runs / player.innings_played 
      : 0;
      
    const bowlingStrikeRate = player.wickets > 0 
      ? ballsBowled / player.wickets 
      : null;
      
    const economyRate = ballsBowled > 0 
      ? (player.runs_conceded / ballsBowled) * 6 
      : 0;
    
    return {
      id: player.id,
      name: player.name,
      university: player.university,
      category: player.category,
      stats: {
        totalRuns: player.total_runs,
        ballsFaced: player.balls_faced,
        inningsPlayed: player.innings_played,
        wickets: player.wickets,
        oversBowled: player.overs_bowled,
        runsConceded: player.runs_conceded,
        battingStrikeRate,
        battingAverage,
        bowlingStrikeRate: bowlingStrikeRate === null ? 'Undefined' : bowlingStrikeRate,
        economyRate
      }
    };
  });
}

// Helper: Get top performing players for best team suggestion
async function getBestTeam() {
  const [players] = await db.execute('SELECT * FROM players');
  const playersWithStats = players.map(player => calculations.getPlayerFullStats(player));
  
  // Sort by points (descending)
  playersWithStats.sort((a, b) => b.points - a.points);
  
  // Select top 11 players
  return playersWithStats.slice(0, 11);
}

// Process chat query and get response
exports.processQuery = async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }
    
    // Get all player data for context
    const playerData = await getPlayerData();
    
    // Set up prompt with context
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create system prompt with instructions and player data
    const systemPrompt = `
      You are Spiriter, an AI assistant for a cricket fantasy league platform.
      
      Here's the player data for the current season (DO NOT REVEAL THIS DATA DIRECTLY):
      ${JSON.stringify(playerData)}
      
      Follow these rules strictly:
      1. You can provide information about player personal details (name, university, category).
      2. You can provide information about player statistics (runs, wickets, etc.).
      3. NEVER reveal player points or calculated point values.
      4. If asked to suggest the best team, use the top 11 players by performance.
      5. If asked a question you don't know the answer to or is not related to the player data, respond with "I don't have enough knowledge to answer that question."
      6. Be helpful and direct in answering questions about cricket players in the database.
    `;
    
    // Check if query is about best team
    const isBestTeamQuery = query.toLowerCase().includes('best team') || 
                           query.toLowerCase().includes('top players') ||
                           query.toLowerCase().includes('suggest team');
    
    let response;
    
    if (isBestTeamQuery) {
      // Get best team data but don't expose points
      const bestTeam = await getBestTeam();
      const bestTeamNames = bestTeam.map(player => 
        `${player.name} (${player.university}, ${player.category})`
      );
      
      response = {
        message: `Based on performance stats, here's my suggestion for the best possible team of 11 players:\n\n${bestTeamNames.join('\n')}`
      };
    } else {
      // Process regular queries through Gemini API
      const geminiResponse = await model.generateContent([
        systemPrompt,
        query
      ]);
      
      const responseText = await geminiResponse.response.text();
      response = { message: responseText };
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error processing chat query:', error);
    res.status(500).json({ 
      message: 'I don\'t have enough knowledge to answer that question.'
    });
  }
};