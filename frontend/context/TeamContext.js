'use client';

import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
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

  // Calculate team composition details for chatbot context
  const teamComposition = useMemo(() => {
    if (!team.players || team.players.length === 0) {
      return {
        batsmen: 0,
        bowlers: 0,
        allRounders: 0
      };
    }

    const composition = {
      batsmen: team.players.filter(player => player.category === 'Batsman').length,
      bowlers: team.players.filter(player => player.category === 'Bowler').length,
      allRounders: team.players.filter(player => player.category === 'All-rounder').length
    };

    return composition;
  }, [team.players]);

  // Formatted team data for chatbot
  const chatbotTeamData = useMemo(() => {
    if (!team.teamId) return null;

    // Get captain and vice-captain if selected
    const captain = team.players.find(player => player.isCaptain);
    const viceCaptain = team.players.find(player => player.isViceCaptain);

    return {
      teamId: team.teamId,
      budget: {
        total: 9000000, // Assuming this is the fixed starting budget
        spent: team.budgetSpent,
        remaining: team.remainingBudget
      },
      teamComposition: {
        totalPlayers: team.totalPlayers,
        batsmen: teamComposition.batsmen,
        bowlers: teamComposition.bowlers,
        allRounders: teamComposition.allRounders,
        hasFullTeam: team.totalPlayers === 11,
        hasCaptain: !!captain,
        hasViceCaptain: !!viceCaptain
      },
      players: team.players.map(player => ({
        id: player.id,
        name: player.name,
        university: player.university,
        category: player.category,
        marketValue: player.marketValue,
        isCaptain: player.isCaptain,
        isViceCaptain: player.isViceCaptain
      })),
      roleDistribution: {
        needsMoreBatsmen: teamComposition.batsmen < 4,
        needsMoreBowlers: teamComposition.bowlers < 4,
        needsMoreAllRounders: teamComposition.allRounders < 2
      }
    };
  }, [team, teamComposition]);

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
    isComplete: team.totalPlayers === 11,
    teamComposition,
    chatbotTeamData // Add the formatted data for chatbot
  };

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
};

// Custom hook to use team context
export const useTeam = () => useContext(TeamContext);

export default TeamContext;