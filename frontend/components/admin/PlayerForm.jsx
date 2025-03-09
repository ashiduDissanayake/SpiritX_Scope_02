'use client';

import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import Avatar from 'react-avatar';

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
    runs_conceded: 0,
    photo: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isEditing) {
        await playerService.updatePlayer(playerId, formData);
      } else {
        await playerService.createPlayer(formData);
        setFormData({
          name: '',
          university: '',
          category: 'Batsman',
          total_runs: 0,
          balls_faced: 0,
          innings_played: 0,
          wickets: 0,
          overs_bowled: 0,
          runs_conceded: 0,
          photo: ''
        });
      }
      
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
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-2xl max-w-3xl mx-auto border border-gray-700">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white mb-1 flex items-center">
            {/* Cricket bat icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l15 15M6 3c-1.333 1-2 2.333-2 4 0 5 2 7 5 7 1.667 0 3.333-.667 5-2l-8-9z" />
              <path d="M9 12l-3 6 6-3" />
            </svg>
            {isEditing ? 'Edit Player' : 'Add New Player'}
          </h2>
          {/* Plus icon for adding player */}
          {!isEditing && (
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          )}
        </div>
        
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-indigo-300 font-medium flex items-center">
            {/* Player icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Player Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="university" className="block text-indigo-300 font-medium flex items-center">
            {/* University/school icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            University
          </label>
          <input
            type="text"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
            className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="block text-indigo-300 font-medium flex items-center">
            {/* Category/type icon - cricket related */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
              <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
            </svg>
            Player Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white appearance-none"
            >
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center mb-4">
            {/* Cricket bat icon for batting section */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3l15 15M6 3c-1.333 1-2 2.333-2 4 0 5 2 7 5 7 1.667 0 3.333-.667 5-2l-8-9z" />
              <path d="M9 12l-3 6 6-3" />
            </svg>
            <h3 className="text-xl font-semibold text-indigo-300">
              Batting Statistics
            </h3>
          </div>
          <div className="h-px w-full bg-gray-700 mb-4"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="total_runs" className="block text-indigo-300 font-medium flex items-center">
                {/* Runs icon - cricket ball */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
                  <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
                </svg>
                Total Runs
              </label>
              <input
                type="number"
                id="total_runs"
                name="total_runs"
                value={formData.total_runs}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
            
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="balls_faced" className="block text-indigo-300 font-medium flex items-center">
                {/* Cricket ball icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
                  <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
                </svg>
                Balls Faced
              </label>
              <input
                type="number"
                id="balls_faced"
                name="balls_faced"
                value={formData.balls_faced}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
            
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="innings_played" className="block text-indigo-300 font-medium flex items-center">
                {/* Cricket bat icon for innings */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3l15 15M6 3c-1.333 1-2 2.333-2 4 0 5 2 7 5 7 1.667 0 3.333-.667 5-2l-8-9z" />
                </svg>
                Innings Played
              </label>
              <input
                type="number"
                id="innings_played"
                name="innings_played"
                value={formData.innings_played}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center mb-4">
            {/* Cricket ball icon for bowling section */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
              <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-indigo-300">
              Bowling Statistics
            </h3>
          </div>
          <div className="h-px w-full bg-gray-700 mb-4"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="wickets" className="block text-indigo-300 font-medium flex items-center">
                {/* Wicket icon - cricket stumps */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22V8M8 22V2M12 22v-7M16 22V8M20 22V4" />
                </svg>
                Wickets
              </label>
              <input
                type="number"
                id="wickets"
                name="wickets"
                value={formData.wickets}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
            
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="overs_bowled" className="block text-indigo-300 font-medium flex items-center">
                {/* Cricket ball spinning icon for overs */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Overs Bowled
              </label>
              <input
                type="number"
                id="overs_bowled"
                name="overs_bowled"
                value={formData.overs_bowled}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
            
            <div className="space-y-2 bg-gray-800/40 p-4 rounded-lg border border-gray-700">
              <label htmlFor="runs_conceded" className="block text-indigo-300 font-medium flex items-center">
                {/* Cricket ball icon for runs conceded */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
                  <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
                </svg>
                Runs Conceded
              </label>
              <input
                type="number"
                id="runs_conceded"
                name="runs_conceded"
                value={formData.runs_conceded}
                onChange={handleChange}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-6">
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                {/* Cricket ball icon for submit button */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12s1.5-1.5 4-1.5 4 1.5 4 1.5-1.5 1.5-4 1.5-4-1.5-4-1.5z" />
                  <path d="M12 16c-3.5 0-4-3-4-3s1.5-3 4-3 4 3 4 3-1.5 3-4 3z" />
                </svg>
                {isEditing ? 'Update Player' : 'Add Player'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}