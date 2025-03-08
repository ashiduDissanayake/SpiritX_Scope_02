'use client';

import { useState, useEffect } from 'react';
import { statsService } from '@/lib/api';
import styles from './TournamentStats.module.css';

export default function TournamentStats() {
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    highestRunScorer: null,
    highestWicketTaker: null
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await statsService.getTournamentSummary();
        setStats(data);
      } catch (err) {
        setError('Failed to load tournament statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return <div className={styles.loadingState}>Loading tournament statistics...</div>;
  }
  
  if (error) {
    return <div className={styles.errorState}>{error}</div>;
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Tournament Summary</h1>
      
      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Runs</span>
          <span className={styles.statValue}>{stats.totalRuns}</span>
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Wickets</span>
          <span className={styles.statValue}>{stats.totalWickets}</span>
        </div>
      </div>
      
      <h2 className={styles.sectionTitle}>Top Performers</h2>
      
      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Highest Run Scorer</span>
          {stats.highestRunScorer ? (
            <div className={styles.playerCard}>
              <div className={styles.playerName}>{stats.highestRunScorer.name}</div>
              <div className={styles.playerUniversity}>{stats.highestRunScorer.university}</div>
              <div className={styles.playerStats}>{stats.highestRunScorer.total_runs} runs</div>
            </div>
          ) : (
            <div className={styles.noData}>No data available</div>
          )}
        </div>
        
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Highest Wicket Taker</span>
          {stats.highestWicketTaker ? (
            <div className={styles.playerCard}>
              <div className={styles.playerName}>{stats.highestWicketTaker.name}</div>
              <div className={styles.playerUniversity}>{stats.highestWicketTaker.university}</div>
              <div className={styles.playerStats}>{stats.highestWicketTaker.wickets} wickets</div>
            </div>
          ) : (
            <div className={styles.noData}>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}