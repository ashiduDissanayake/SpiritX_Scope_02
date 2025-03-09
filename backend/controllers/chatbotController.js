const db = require("../config/db");
const { genAI } = require("../config/gemini");
const calculations = require("../utils/calculations");

// Helper: Get player data for chat context
async function getPlayerData() {
  const [players] = await db.execute(`
    SELECT id, name, university, category, total_runs, balls_faced, 
           innings_played, wickets, overs_bowled, runs_conceded
    FROM players
  `);

  // Calculate all stats for all players
  return players.map((player) => {
    const ballsBowled = player.overs_bowled * 6;
    const battingStrikeRate =
      player.balls_faced > 0
        ? (player.total_runs / player.balls_faced) * 100
        : 0;

    const battingAverage =
      player.innings_played > 0 ? player.total_runs / player.innings_played : 0;

    const bowlingStrikeRate =
      player.wickets > 0 ? ballsBowled / player.wickets : null;

    const economyRate =
      ballsBowled > 0 ? (player.runs_conceded / ballsBowled) * 6 : 0;

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
        bowlingStrikeRate:
          bowlingStrikeRate === null ? "Undefined" : bowlingStrikeRate,
        economyRate,
      },
    };
  });
}

// Helper: Get top performing players for best team suggestion
async function getBestTeam() {
  const [players] = await db.execute("SELECT * FROM players");
  const playersWithStats = players.map((player) =>
    calculations.getPlayerFullStats(player)
  );

  // Sort by points (descending)
  playersWithStats.sort((a, b) => b.points - a.points);

  // Select top 11 players
  return playersWithStats.slice(0, 11);
}

// Helper: Get user team data (without assuming market_value column exists)
async function getUserTeamData(userId) {
  try {
    // First check if the user has a team
    const [userTeams] = await db.execute(
      "SELECT id FROM user_teams WHERE user_id = ?",
      [userId]
    );
    
    if (userTeams.length === 0) {
      return null; // User has no team
    }
    
    const teamId = userTeams[0].id;
    
    // Get the team's players
    const [teamPlayers] = await db.execute(`
      SELECT p.id, p.name, p.university, p.category,
             p.total_runs, p.balls_faced, p.innings_played, p.wickets, 
             p.overs_bowled, p.runs_conceded, tp.is_captain, tp.is_vice_captain
      FROM team_players tp
      JOIN players p ON tp.player_id = p.id
      WHERE tp.team_id = ?
    `, [teamId]);
    
    // Get team budget info
    const [teamInfo] = await db.execute(
      "SELECT total_budget, remaining_budget FROM user_teams WHERE id = ?",
      [teamId]
    );
    
    // Format the result
    const playersByRole = {
      batsmen: teamPlayers.filter(p => p.category === "Batsman"),
      bowlers: teamPlayers.filter(p => p.category === "Bowler"),
      allRounders: teamPlayers.filter(p => p.category === "All-rounder"),
    };
    
    return {
      teamId,
      budget: {
        total: teamInfo[0]?.total_budget || 0,
        remaining: teamInfo[0]?.remaining_budget || 0
      },
      teamComposition: {
        totalPlayers: teamPlayers.length,
        batsmen: playersByRole.batsmen.length,
        bowlers: playersByRole.bowlers.length, 
        allRounders: playersByRole.allRounders.length
      },
      players: teamPlayers.map(p => ({
        id: p.id,
        name: p.name,
        university: p.university,
        category: p.category,
        isCaptain: p.is_captain === 1,
        isViceCaptain: p.is_vice_captain === 1
      }))
    };
  } catch (error) {
    console.error("Error fetching user team data:", error);
    return null;
  }
}

// Process chat query and get response
exports.processQuery = async (req, res) => {
  try {
    const { query, currentPage, teamContext } = req.body;
    const userId = req.user.id;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    // Get all player data for context
    const playerData = await getPlayerData();
    
    // Get user's team data if available - prefer passed teamContext but fetch if needed
    let userTeamData = teamContext;
    if (!userTeamData && (currentPage === "select-team" || currentPage === "my-team")) {
      userTeamData = await getUserTeamData(userId);
    }

    // Check if query is about best team
    const isBestTeamQuery =
      query.toLowerCase().includes("best team") ||
      query.toLowerCase().includes("top players") ||
      query.toLowerCase().includes("suggest team");

    let response;

    if (isBestTeamQuery) {
      // Get best team data but don't expose points
      const bestTeam = await getBestTeam();
      const bestTeamNames = bestTeam.map(
        (player) => `**${player.name}** (${player.university}, ${player.category})`
      );

      response = {
        message: `Based on performance stats, here's my suggestion for the best possible team of 11 players:\n\n${bestTeamNames.join(
          "\n"
        )}`,
        formatted: true
      };
    } else {
      try {
        // Set up the model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Create context about current page/state
        let contextInfo = "";
        if (userTeamData) {
          contextInfo = `
          # USER'S CURRENT TEAM CONTEXT
          The user is currently on the "${currentPage}" page.
          
          User's team information:
          - Total budget: ${userTeamData.budget?.total || 0}
          - Remaining budget: ${userTeamData.budget?.remaining || 0}
          - Current team composition: ${userTeamData.teamComposition?.totalPlayers || 0} players total
            * ${userTeamData.teamComposition?.batsmen || 0} Batsmen
            * ${userTeamData.teamComposition?.bowlers || 0} Bowlers
            * ${userTeamData.teamComposition?.allRounders || 0} All-rounders
          
          Players in user's team:
          ${userTeamData.players ? userTeamData.players.map(p => 
            `- ${p.name} (${p.category})${p.isCaptain ? ' - Captain' : ''}${p.isViceCaptain ? ' - Vice Captain' : ''}`
          ).join('\n') : 'No players selected yet.'}
          `;
        }

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

          ${contextInfo}

          The player data provided is:
          ${JSON.stringify(playerData)}

# SPIRITER: CRICKET FANTASY AI ASSISTANT SYSTEM INSTRUCTIONS

## CORE IDENTITY AND PURPOSE
You are Spiriter, an expert AI assistant specializing in cricket fantasy team building for SpiritX platform. Your purpose is to help users make informed decisions about their fantasy cricket teams.

## RESPONSE FORMAT AND STYLING GUIDELINES
- Use **bold text** for important information like player names, key stats, and headings
- Use *italic text* for emphasis and highlighting important points
- Use bullet points and numbered lists for organizing information
- Create clear sections with headings when providing detailed analyses
- Use horizontal rules (---) to separate major sections when appropriate
- Keep paragraphs short (2-3 sentences) for better readability
- Round decimal numbers to 2 places for clarity

## CONTEXT-AWARE ADVICE
When the user has provided team context:
- Reference their current team composition in your answers
- Consider their remaining budget when recommending players
- Suggest specific improvements based on their current team
- If their team lacks players in a certain role, prioritize those recommendations
- Consider team balance in your suggestions (proper mix of batsmen, bowlers, all-rounders)

## DETAILED RESPONSE GUIDELINES
1. For player information queries:
   - Start with a brief player summary
   - Present key statistics in a visually organized manner
   - Compare the player to others in similar roles when relevant

2. For team building advice:
   - Focus on balanced team composition (4-5 batsmen, 4-5 bowlers, 1-2 all-rounders)
   - Make budget-conscious recommendations
   - Suggest captain/vice-captain options based on consistent performance

3. For performance analysis:
   - Use comparative statistics between players
   - Provide context for what makes certain stats good or bad
   - Use visual formatting to highlight key differences

4. Always provide your reasoning for recommendations:
   - Explain why certain players are good choices
   - Base recommendations on statistical evidence
   - Consider both performance and value-for-money

## SPECIFIC TEAM CONTEXT RESPONSES
When the user asks for recommendations while on team selection pages:
- Analyze their current team composition
- Suggest players that complement their existing lineup
- Consider their remaining budget
- Recommend specific players to replace if there are better options
- Provide captain/vice-captain suggestions if they haven't selected these roles

Remember to format your responses with proper styling to enhance readability and make important information stand out.
`;

        // Process regular queries through Gemini API
        const geminiResponse = await model.generateContent([
          systemPrompt,
          query,
        ]);

        const responseText = await geminiResponse.response.text();
        response = { 
          message: responseText,
          formatted: true 
        };
      } catch (aiError) {
        console.error("AI Model Error:", aiError);

        // Fallback response when AI model fails
        response = {
          message:
            "I'm having trouble processing your request right now. Please try again later.",
          formatted: false
        };
      }
    }

    res.json(response);
  } catch (error) {
    console.error("Error processing chat query:", error);
    res.status(500).json({
      message:
        "I'm experiencing technical difficulties. Please try again later.",
      formatted: false
    });
  }
};