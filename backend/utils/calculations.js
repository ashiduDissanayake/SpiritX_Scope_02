/**
 * Utility functions for player statistics and calculations
 */

// Calculate batting strike rate
function calculateBattingStrikeRate(runs, ballsFaced) {
  if (ballsFaced === 0) return 0;
  return (runs / ballsFaced) * 100;
}

// Calculate batting average
function calculateBattingAverage(runs, inningsPlayed) {
  if (inningsPlayed === 0) return 0;
  return runs / inningsPlayed;
}

// Calculate bowling strike rate
function calculateBowlingStrikeRate(ballsBowled, wickets) {
  if (wickets === 0) return null; // Undefined case
  return ballsBowled / wickets;
}

// Calculate economy rate
function calculateEconomyRate(runsConceded, ballsBowled) {
  if (ballsBowled === 0) return 0;
  return (runsConceded / ballsBowled) * 6;
}

// Convert overs to balls
function oversToBalls(overs) {
  return overs * 6;
}

// Calculate player points
function calculatePlayerPoints(player) {
  // Extract player statistics
  const battingStrikeRate = calculateBattingStrikeRate(player.total_runs, player.balls_faced);
  const battingAverage = calculateBattingAverage(player.total_runs, player.innings_played);
  
  // Handle the undefined bowling strike rate case
  const ballsBowled = oversToBalls(player.overs_bowled);
  const bowlingStrikeRate = calculateBowlingStrikeRate(ballsBowled, player.wickets);
  const economyRate = calculateEconomyRate(player.runs_conceded, ballsBowled);
  
  // Calculate points components
  const battingPoints = (battingStrikeRate / 5) + (battingAverage * 0.8);
  
  // Handle undefined bowling strike rate as per rules
  let bowlingPoints = 0;
  if (economyRate > 0) {
    bowlingPoints = 140 / economyRate;
  }
  if (bowlingStrikeRate !== null) {
    bowlingPoints += 500 / bowlingStrikeRate;
  }
  
  return battingPoints + bowlingPoints;
}

// Calculate player value
function calculatePlayerValue(points) {
  const value = (9 * points + 100) * 1000;
  // Round to nearest 50,000
  return Math.round(value / 50000) * 50000;
}

// Get player full stats with calculated values
function getPlayerFullStats(player) {
  const ballsBowled = oversToBalls(player.overs_bowled);
  const battingStrikeRate = calculateBattingStrikeRate(player.total_runs, player.balls_faced);
  const battingAverage = calculateBattingAverage(player.total_runs, player.innings_played);
  const bowlingStrikeRate = calculateBowlingStrikeRate(ballsBowled, player.wickets);
  const economyRate = calculateEconomyRate(player.runs_conceded, ballsBowled);
  const points = calculatePlayerPoints(player);
  const value = calculatePlayerValue(points);
  
  return {
    ...player,
    battingStrikeRate,
    battingAverage,
    bowlingStrikeRate: bowlingStrikeRate === null ? 'Undefined' : bowlingStrikeRate,
    economyRate,
    points,
    value
  };
}

module.exports = {
  calculateBattingStrikeRate,
  calculateBattingAverage,
  calculateBowlingStrikeRate,
  calculateEconomyRate,
  calculatePlayerPoints,
  calculatePlayerValue,
  getPlayerFullStats,
  oversToBalls
};