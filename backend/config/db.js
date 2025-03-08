const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Handle connection string format (Aiven format)
let connectionConfig;

// Check if we're using a connection URL or separate parameters
if (process.env.DB_HOST && process.env.DB_HOST.startsWith('mysql://')) {
  // Parse connection URL
  const dbUrl = new URL(process.env.DB_HOST);
  
  connectionConfig = {
    host: dbUrl.hostname,
    port: dbUrl.port || 3306,
    user: dbUrl.username || process.env.DB_USER,
    password: dbUrl.password || process.env.DB_PASSWORD,
    database: dbUrl.pathname.substring(1) || process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true' ? {
      // If you have a CA certificate file
      ca: process.env.DB_SSL_CA ? fs.readFileSync(path.resolve(process.env.DB_SSL_CA)) : undefined,
      rejectUnauthorized: true
    } : undefined
  };
} else {
  // Use separate connection parameters
  connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'spirit11',
    ssl: process.env.DB_SSL === 'true' ? {
      ca: process.env.DB_SSL_CA ? fs.readFileSync(path.resolve(process.env.DB_SSL_CA)) : undefined,
      rejectUnauthorized: true
    } : undefined
  };
}

// Add connection pool options
connectionConfig = {
  ...connectionConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Log connection config (without password) for debugging
console.log('Database connection config:', {
  ...connectionConfig,
  password: '********' // Don't log the actual password
});

const pool = mysql.createPool(connectionConfig);

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('Successfully connected to MySQL database');
    connection.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

module.exports = pool;