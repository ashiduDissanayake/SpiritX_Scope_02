'use client';
import { useState, useEffect } from 'react';
import { teamService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await teamService.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Format number with 2 decimal places
  const formatNumber = (num) => {
    return num !== null && num !== undefined ? Number(num).toFixed(2) : 'N/A';
  };
  
  if (loading) {
    return <div className={styles.loading}>Loading leaderboard...</div>;
  }
  
  return (
    <div className={styles.leaderboardPage}>
      <h1>Leaderboard</h1>
      
      {leaderboard.length === 0 ? (
        <div className={styles.emptyLeaderboard}>
          <p>No teams have been completed yet. Be the first to complete your team!</p>
        </div>
      ) : (
        <div className={styles.leaderboardTable}>
          <div className={styles.tableHeader}>
            <div className={styles.rankColumn}>Rank</div>
            <div className={styles.usernameColumn}>Username</div>
            <div className={styles.pointsColumn}>Points</div>
          </div>
          
          {leaderboard.map((entry, index) => (
            <div 
              key={entry.userId} 
              className={`${styles.tableRow} ${user && entry.userId === user.id ? styles.currentUser : ''}`}
            >
              <div className={styles.rankColumn}>{index + 1}</div>
              <div className={styles.usernameColumn}>{entry.username}</div>
              <div className={styles.pointsColumn}>{formatNumber(entry.totalPoints)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}