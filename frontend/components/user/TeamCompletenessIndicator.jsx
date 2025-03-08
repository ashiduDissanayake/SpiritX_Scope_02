'use client';

import { useTeam } from '@/context/TeamContext';
import styles from './TeamCompletenessIndicator.module.css';

export default function TeamCompletenessIndicator() {
  const { team } = useTeam();
  const { totalPlayers } = team;
  
  // Calculate completion percentage
  const completionPercentage = (totalPlayers / 11) * 100;
  
  // Determine status text and color
  let statusText = 'Incomplete';
  let statusClass = styles.incomplete;
  
  if (totalPlayers === 11) {
    statusText = 'Complete';
    statusClass = styles.complete;
  } else if (totalPlayers > 7) {
    statusText = 'Almost Complete';
    statusClass = styles.almostComplete;
  }
  
  return (
    <div className={styles.completenessIndicator}>
      <h2>Team Status</h2>
      
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar}
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      <div className={styles.statusInfo}>
        <span className={styles.playerCount}>
          {totalPlayers}/11 players selected
        </span>
        <span className={`${styles.status} ${statusClass}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
}