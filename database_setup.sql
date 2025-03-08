-- Create the database (drop if exists first)
DROP DATABASE IF EXISTS spirit11;
CREATE DATABASE spirit11;
USE spirit11;

-- Create Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Players table
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  university VARCHAR(255) NOT NULL,
  category ENUM('Batsman', 'Bowler', 'All-Rounder') NOT NULL,
  total_runs INT NOT NULL DEFAULT 0,
  balls_faced INT NOT NULL DEFAULT 0,
  innings_played INT NOT NULL DEFAULT 0,
  wickets INT NOT NULL DEFAULT 0,
  overs_bowled INT NOT NULL DEFAULT 0,
  runs_conceded INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Teams table
CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create TeamPlayers junction table
CREATE TABLE team_players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  team_id INT NOT NULL,
  player_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE,
  UNIQUE KEY unique_team_player (team_id, player_id)
);

-- Insert default admin account
INSERT INTO users (username, password, is_admin) 
VALUES ('spiritx_2025', '$2a$12$TY7SdmfLJ91WFSbMYmRBveWtLFiI9vvfmRpVQKPdDhlQImq4gOTC.', 1);
-- The password is hashed version of 'SpiritX@2025'