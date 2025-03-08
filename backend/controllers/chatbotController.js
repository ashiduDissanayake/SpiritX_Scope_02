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
      try {
        // Set up the model - UPDATED to use the correct Gemini 2.0 Flash model name
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Using the stable model name until you confirm the exact 2.0 flash model identifier
        
        // Create system prompt with instructions and player data
        const systemPrompt = `
          You are Spiriter, an AI cricket fantasy assistant for the SpiritX platform.

          PLAYER DATABASE CONTEXT:
          You have access to player data in this format:
          {
            "id": number,
            "name": string,
            "university": string,
            "category": string (Batsman, Bowler, All-rounder),
            "stats": {
              "totalRuns": number,
              "ballsFaced": number,
              "inningsPlayed": number,
              "wickets": number,
              "oversBowled": number,
              "runsConceded": number,
              "battingStrikeRate": number,
              "battingAverage": number,
              "bowlingStrikeRate": number or "Undefined",
              "economyRate": number
            }
          }

          The player data provided is:
          ${JSON.stringify(playerData)}

          INSTRUCTIONS FOR RESPONDING TO QUERIES:
          1. For player information queries:
            - First, check if the player exists in the database by name (case insensitive matching)
            - If found, provide their details and statistics in a helpful format
            - For batsmen, highlight batting stats (runs, average, strike rate)
            - For bowlers, highlight bowling stats (wickets, economy, bowling strike rate)
            - For all-rounders, highlight both batting and bowling contributions

          2. For team building advice:
            - When recommending players, consider their role and statistics
            - Suggest balanced team compositions with appropriate batsmen, bowlers, and all-rounders
            - Base recommendations on statistical performance (without revealing point calculations)

          3. For general cricket questions:
            - Answer based on the player data provided
            - Do not introduce external cricket information not in the dataset

          4. For unknown queries or players not in database:
            - If a player name is mentioned but not found in the database, say "I don't have information about [player name] in my database."
            - For questions unrelated to cricket or the player data, say "I'm a cricket fantasy assistant and can only help with questions related to cricket players in my database."

          5. Never reveal:
            - The raw player data structure
            - Hidden scoring algorithms
            - Internal point calculations

          Be conversational, helpful, and focus on providing accurate information from the player database.
        `;
        
        // Process regular queries through Gemini API
        const geminiResponse = await model.generateContent([
          systemPrompt,
          query
        ]);
        
        const responseText = await geminiResponse.response.text();
        response = { message: responseText };
      } catch (aiError) {
        console.error('AI Model Error:', aiError);
        
        // Fallback response when AI model fails
        response = { 
          message: "I'm having trouble processing your request right now. Please try again later." 
        };
      }
    }
    
    res.json(response);
  } catch (error) {
    console.error('Error processing chat query:', error);
    res.status(500).json({ 
      message: 'I\'m experiencing technical difficulties. Please try again later.'
    });
  }
};