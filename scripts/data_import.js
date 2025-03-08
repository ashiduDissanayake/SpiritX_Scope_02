/**
 * Spirit11 Data Import Script
 * This script imports player data from the sample_data.csv file into the database
 */

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
const csv = require('csv-parser');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'spirit11',
};

// Path to the CSV file
const csvFilePath = path.join(__dirname, '..', 'sample_data.csv');

async function importData() {
  console.log('Starting data import...');
  
  // Create database connection
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database');
    
    // Check if players table already has data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM players');
    
    if (rows[0].count > 0) {
      console.log(`The players table already has ${rows[0].count} records. Skipping import.`);
      console.log('If you want to reimport, truncate the players table first.');
      return;
    }
    
    // Read CSV file and insert data
    const players = [];
    
    // Create a promise to track when CSV parsing is complete
    const parsePromise = new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
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
        .on('end', () => {
          console.log(`CSV file successfully processed. Found ${players.length} players.`);
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
    });
    
    // Wait for CSV parsing to complete
    await parsePromise;
    
    // Insert player data into database using a bulk insert
    if (players.length > 0) {
      const query = `
        INSERT INTO players 
        (name, university, category, total_runs, balls_faced, innings_played, 
         wickets, overs_bowled, runs_conceded)
        VALUES ?
      `;
      
      const [result] = await connection.query(query, [players]);
      console.log(`Successfully imported ${result.affectedRows} players into the database.`);
    } else {
      console.log('No players found in the CSV file.');
    }
    
  } catch (error) {
    console.error('Error during data import:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the import function
importData().then(() => {
  console.log('Data import process completed.');
}).catch(err => {
  console.error('Unhandled error during import:', err);
  process.exit(1);
});