'use client';

import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { teamService } from '@/lib/api';
import { useAuth } from './AuthContext';

// Create context
const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState({
    teamId: null,
    players: [],
    totalPlayers: 0,
    totalPoints: null,
    budgetSpent: 0,
    remainingBudget: 9000000
  });
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Load user's team - wrapped in useCallback to prevent recreation on each render
  const loadTeam = useCallback(async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const teamData = await teamService.getUserTeam();
      setTeam(teamData);
    } catch (error) {
      console.error('Failed to load team:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]); // Only depends on isAuthenticated

  // Add player to team
  const addPlayer = useCallback(async (playerId) => {
    try {
      await teamService.addPlayerToTeam(playerId);
      await loadTeam(); // Reload team after adding player
      return { success: true };
    } catch (error) {
      console.error('Failed to add player:', error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add player'
      };
    }
  }, [loadTeam]);

  // Remove player from team
  const removePlayer = useCallback(async (teamPlayerId) => {
    try {
      await teamService.removePlayerFromTeam(teamPlayerId);
      await loadTeam(); // Reload team after removing player
      return { success: true };
    } catch (error) {
      console.error('Failed to remove player:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove player'
      };
    }
  }, [loadTeam]);

  // Initial load when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTeam();
    }
  }, [isAuthenticated, loadTeam]);

  // Context value
  const value = {
    team,
    loading,
    loadTeam,
    addPlayer,
    removePlayer,
    isComplete: team.totalPlayers === 11
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Custom hook to use team context
export const useTeam = () => useContext(TeamContext);

export default TeamContext;