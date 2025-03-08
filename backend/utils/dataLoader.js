const fs = require('fs');
const csv = require('csv-parser');
const db = require('../config/db'); // Use the same connection pool from config

async function loadPlayerData() {
  try {
    // Check if players table already has data
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM players');
    
    if (rows[0].count > 0) {
      console.log('Players data already exists in the database');
      return;
    }
    
    const players = [];
    
    // Read CSV file
    fs.createReadStream('sample_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        players.push([
          row.Name,
          row.University,
          row.Category,
          parseInt(row['Total Runs']),
          parseInt(row['Balls Faced']),
          parseInt(row['Innings Played']),
          parseInt(row.Wickets),
          parseInt(row['Overs Bowled']),
          parseInt(row['Runs Conceded'])
        ]);
      })
      .on('end', async () => {
        // Insert players into database
        if (players.length > 0) {
          const query = `
            INSERT INTO players 
            (name, university, category, total_runs, balls_faced, innings_played, 
             wickets, overs_bowled, runs_conceded)
            VALUES ?
          `;
          
          await db.query(query, [players]);
          console.log('Player data imported successfully');
        }
      });
  } catch (error) {
    console.error('Error importing player data:', error);
  }
}

module.exports = { loadPlayerData };