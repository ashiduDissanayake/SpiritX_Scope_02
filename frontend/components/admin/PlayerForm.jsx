'use client';

import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import styles from './PlayerForm.module.css';

export default function PlayerForm({ playerId = null, onSuccess }) {
  const isEditing = !!playerId;
  
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    category: 'Batsman',
    total_runs: 0,
    balls_faced: 0,
    innings_played: 0,
    wickets: 0,
    overs_bowled: 0,
    runs_conceded: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load player data if editing
  useEffect(() => {
    if (isEditing) {
      const fetchPlayer = async () => {
        try {
          const playerData = await playerService.getPlayerById(playerId);
          setFormData(playerData);
        } catch (err) {
          setError('Failed to load player data');
          console.error(err);
        }
      };
      
      fetchPlayer();
    }
  }, [playerId, isEditing]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Convert numeric fields to numbers
    const numericFields = [
      'total_runs', 'balls_faced', 'innings_played',
      'wickets', 'overs_bowled', 'runs_conceded'
    ];
    
    if (numericFields.includes(name)) {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isEditing) {
        await playerService.updatePlayer(playerId, formData);
      } else {
        await playerService.createPlayer(formData);
        // Reset form after creation
        setFormData({
          name: '',
          university: '',
          category: 'Batsman',
          total_runs: 0,
          balls_faced: 0,
          innings_played: 0,
          wickets: 0,
          overs_bowled: 0,
          runs_conceded: 0
        });
      }
      
      // Notify parent of success
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save player');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form className={styles.playerForm} onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Player' : 'Add New Player'}</h2>
      
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Player Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="university">University</label>
        <input
          type="text"
          id="university"
          name="university"
          value={formData.university}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>
      </div>
      
      <h3>Batting Statistics</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="total_runs">Total Runs</label>
          <input
            type="number"
            id="total_runs"
            name="total_runs"
            value={formData.total_runs}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="balls_faced">Balls Faced</label>
          <input
            type="number"
            id="balls_faced"
            name="balls_faced"
            value={formData.balls_faced}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="innings_played">Innings Played</label>
          <input
            type="number"
            id="innings_played"
            name="innings_played"
            value={formData.innings_played}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>
      
      <h3>Bowling Statistics</h3>
      
      <div className={styles.statsGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="wickets">Wickets</label>
          <input
            type="number"
            id="wickets"
            name="wickets"
            value={formData.wickets}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="overs_bowled">Overs Bowled</label>
          <input
            type="number"
            id="overs_bowled"
            name="overs_bowled"
            value={formData.overs_bowled}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="runs_conceded">Runs Conceded</label>
          <input
            type="number"
            id="runs_conceded"
            name="runs_conceded"
            value={formData.runs_conceded}
            onChange={handleChange}
            min="0"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={loading}
      >
        {loading ? 'Saving...' : isEditing ? 'Update Player' : 'Add Player'}
      </button>
    </form>
  );
}