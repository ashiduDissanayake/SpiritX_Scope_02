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
    <div className="w-full max-w-5xl mx-auto p-4">
      <form 
        className="bg-gradient-to-br from-[#04102a] to-[#030917] border border-[#0a1a3a] shadow-xl rounded-xl overflow-hidden"
        onSubmit={handleSubmit}
      >
        {/* Compact Header */}
        <div className="relative bg-[#04102a]/70 border-b border-[#0a1a3a] px-4 py-3">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#8b5cf6]"></div>
          <h2 className="text-xl font-bold text-white">{isEditing ? 'Edit Player' : 'Add New Player'}</h2>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mx-4 my-2 px-3 py-2 bg-red-900/30 border border-red-800 rounded text-red-400 text-xs">
            {error}
          </div>
        )}
        
        <div className="p-4">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <Avatar
              name={formData.name}
              src={formData.photo}
              round={true}
              size="100"
              color="#04102a"
              fgColor="#FFFFFF"
            />
          </div>
          
          {/* All form fields in a compact 3-column grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {/* Basic Information */}
            <div className="space-y-1">
              <label htmlFor="name" className="block text-xs font-medium text-gray-300">Player Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="university" className="block text-xs font-medium text-gray-300">University</label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="category" className="block text-xs font-medium text-gray-300">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
              >
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
              </select>
            </div>
          </div>
          
          {/* Stats Sections */}
          <div className="grid grid-cols-2 gap-4">
            {/* Batting Stats */}
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-sm font-semibold text-white">Batting Statistics</h3>
                <div className="flex-grow ml-2 h-px bg-gradient-to-r from-[#3b82f6]/50 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="total_runs" className="w-24 text-xs font-medium text-gray-300">Total Runs</label>
                  <input
                    type="number"
                    id="total_runs"
                    name="total_runs"
                    value={formData.total_runs}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="balls_faced" className="w-24 text-xs font-medium text-gray-300">Balls Faced</label>
                  <input
                    type="number"
                    id="balls_faced"
                    name="balls_faced"
                    value={formData.balls_faced}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="innings_played" className="w-24 text-xs font-medium text-gray-300">Innings Played</label>
                  <input
                    type="number"
                    id="innings_played"
                    name="innings_played"
                    value={formData.innings_played}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
              </div>
            </div>
            
            {/* Bowling Stats */}
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-sm font-semibold text-white">Bowling Statistics</h3>
                <div className="flex-grow ml-2 h-px bg-gradient-to-r from-[#10b981]/50 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-2">
                  <label htmlFor="wickets" className="w-24 text-xs font-medium text-gray-300">Wickets</label>
                  <input
                    type="number"
                    id="wickets"
                    name="wickets"
                    value={formData.wickets}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="overs_bowled" className="w-24 text-xs font-medium text-gray-300">Overs Bowled</label>
                  <input
                    type="number"
                    id="overs_bowled"
                    name="overs_bowled"
                    value={formData.overs_bowled}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <label htmlFor="runs_conceded" className="w-24 text-xs font-medium text-gray-300">Runs Conceded</label>
                  <input
                    type="number"
                    id="runs_conceded"
                    name="runs_conceded"
                    value={formData.runs_conceded}
                    onChange={handleChange}
                    min="0"
                    className="flex-1 bg-[#081631]/50 border border-[#132347] rounded px-3 py-1.5 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-[#4f46e5] to-[#3b82f6] rounded text-white text-sm font-medium shadow-lg hover:shadow-[#4f46e5]/30 transition-all duration-200 disabled:opacity-70"
            >
              {loading ? 'Saving...' : isEditing ? 'Update Player' : 'Add Player'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}