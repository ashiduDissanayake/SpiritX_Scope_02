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
    return <div className={styles.loading}>Loading tournament statistics...</div>;
  }
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  return (
    <div className={styles.tournamentStats}>
      <h2>Tournament Summary</h2>
      
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Runs</h3>
          <div className={styles.statValue}>{stats.totalRuns}</div>
        </div>
        
        <div className={styles.statCard}>
          <h3>Total Wickets</h3>
          <div className={styles.statValue}>{stats.totalWickets}</div>
        </div>
      </div>
      
      <h3>Top Performers</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.performerCard}>
          <h4>Highest Run Scorer</h4>
          {stats.highestRunScorer ? (
            <>
              <div className={styles.performerName}>
                {stats.highestRunScorer.name}
              </div>
              <div className={styles.performerDetails}>
                <span>{stats.highestRunScorer.university}</span>
                <span>{stats.highestRunScorer.total_runs} runs</span>
              </div>
            </>
          ) : (
            <div className={styles.noData}>No data available</div>
          )}
        </div>
        
        <div className={styles.performerCard}>
          <h4>Highest Wicket Taker</h4>
          {stats.highestWicketTaker ? (
            <>
              <div className={styles.performerName}>
                {stats.highestWicketTaker.name}
              </div>
              <div className={styles.performerDetails}>
                <span>{stats.highestWicketTaker.university}</span>
                <span>{stats.highestWicketTaker.wickets} wickets</span>
              </div>
            </>
          ) : (
            <div className={styles.noData}>No data available</div>
          )}
        </div>
      </div>
    </div>
  );
}