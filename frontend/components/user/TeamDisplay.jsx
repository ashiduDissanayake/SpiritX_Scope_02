'use client';

import { useTeam } from '@/context/TeamContext';
import styles from './TeamDisplay.module.css';

export default function TeamDisplay() {
  const { team, removePlayer } = useTeam();
  const { players, totalPoints, totalPlayers } = team;
  
  // Group players by category
  const playersByCategory = {
    Batsman: players.filter(p => p.category === 'Batsman'),
    Bowler: players.filter(p => p.category === 'Bowler'),
    'All-Rounder': players.filter(p => p.category === 'All-Rounder')
  };
  
  // Format currency value
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Format number with 2 decimal places
  const formatNumber = (num) => {
    return num !== null && num !== undefined ? Number(num).toFixed(2) : 'N/A';
  };
  
  // Handle player removal
  const handleRemovePlayer = async (teamPlayerId) => {
    await removePlayer(teamPlayerId);
  };
  
  return (
    <div className={styles.teamDisplay}>
      <h2>Your Team ({totalPlayers}/11)</h2>
      
      {totalPlayers === 0 && (
        <div className={styles.emptyTeam}>
          <p>You haven't selected any players yet. Visit the "Select Team" page to add players.</p>
        </div>
      )}
      
      {totalPlayers > 0 && (
        <>
          {Object.entries(playersByCategory).map(([category, categoryPlayers]) => (
            <div key={category} className={styles.categorySection}>
              <h3>{category}s ({categoryPlayers.length})</h3>
              
              {categoryPlayers.length > 0 ? (
                <div className={styles.playersList}>
                  {categoryPlayers.map(player => (
                    <div key={player.id} className={styles.playerCard}>
                      <div className={styles.playerInfo}>
                        <h4>{player.name}</h4>
                        <p className={styles.university}>{player.university}</p>
                        <p className={styles.value}>{formatCurrency(player.value)}</p>
                      </div>
                      
                      <button 
                        className={styles.removeButton}
                        onClick={() => handleRemovePlayer(player.team_player_id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.noCategoryPlayers}>No {category}s selected</p>
              )}
            </div>
          ))}
          
          {totalPlayers === 11 && (
            <div className={styles.teamPoints}>
              <h3>Team Points</h3>
              <div className={styles.pointsValue}>{formatNumber(totalPoints)}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}