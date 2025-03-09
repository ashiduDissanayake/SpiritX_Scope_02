'use client';
import { useState } from 'react';
import { useTeam } from '@/context/TeamContext';

export default function TeamDisplay() {
  const { team, removePlayer } = useTeam();
  const { players, totalPoints, totalPlayers } = team;
  const [removingPlayerId, setRemovingPlayerId] = useState(null);
  
  // Group players by category
  const playersByCategory = {
    Batsman: players.filter(p => p.category === 'Batsman'),
    Bowler: players.filter(p => p.category === 'Bowler'),
    'All-Rounder': players.filter(p => p.category === 'All-Rounder')
  };
  
  // Format currency (player value)
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
    setRemovingPlayerId(teamPlayerId);
    await removePlayer(teamPlayerId);
    setRemovingPlayerId(null);
  };
  
  if (totalPlayers === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-dark-lightest rounded-full mb-4 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-light-darkest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h3 className="text-xl text-light mb-2">No Players Selected</h3>
        <p className="text-light-darker max-w-md">
          You haven't selected any players yet. Visit the "Select Team" page to add players.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Team Summary */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <div className="px-4 py-2 bg-dark rounded-full text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          <span className="text-light-darker">Players: </span>
          <span className="text-light ml-1">{totalPlayers}/11</span>
        </div>
        <div className="px-4 py-2 bg-dark rounded-full text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
          </svg>
          <span className="text-light-darker">Budget Used: </span>
          <span className="text-light ml-1">{formatCurrency(team.budgetSpent)}</span>
        </div>
      </div>
      
      {/* Player Categories */}
      {Object.entries(playersByCategory).map(([category, categoryPlayers]) => (
        <div key={category} className="mb-8">
          <h3 className={`text-lg font-medium pb-2 mb-3 border-b border-dark-lightest flex items-center ${
            category === 'Batsman' ? 'text-primary-light' : 
            category === 'Bowler' ? 'text-secondary-light' : 
            'text-accent-light'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              {category === 'Batsman' ? (
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              ) : category === 'Bowler' ? (
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              ) : (
                <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
              )}
            </svg>
            {category}s ({categoryPlayers.length})
          </h3>
          
          {categoryPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryPlayers.map(player => (
                <PlayerCard 
                  key={player.id} 
                  player={player} 
                  onRemove={() => handleRemovePlayer(player.team_player_id)} 
                  isRemoving={removingPlayerId === player.team_player_id} 
                />
              ))}
            </div>
          ) : (
            <div className="py-6 bg-dark rounded-lg text-center text-light-darker">
              No {category}s selected
            </div>
          )}
        </div>
      ))}
      
      {/* Team Points - Only visible when team is complete */}
      {totalPlayers === 11 && (
        <div className="mt-8 p-5 bg-gradient-to-r from-primary/10 to-primary-dark/10 rounded-lg border border-primary/20">
          <h3 className="text-lg font-medium text-light text-center mb-2">Team Points</h3>
          <div className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            {formatNumber(totalPoints)}
          </div>
        </div>
      )}
    </div>
  );
}

// Player Card sub-component
function PlayerCard({ player, onRemove, isRemoving }) {
  return (
    <div className="bg-dark rounded-lg border border-dark-lightest overflow-hidden flex flex-col">
      {/* Player header */}
      <div className="p-3 flex justify-between items-start border-b border-dark-lightest">
        <div>
          <h4 className="text-light font-medium">{player.name}</h4>
          <p className="text-light-darker text-sm">{player.university}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${
          player.category === 'Batsman' ? 'bg-primary/20 text-primary-light' :
          player.category === 'Bowler' ? 'bg-secondary/20 text-secondary-light' :
          'bg-accent/20 text-accent-light'
        }`}>
          {player.category}
        </span>
      </div>
      
      {/* Player stats */}
      <div className="p-3 text-sm grid grid-cols-2 gap-x-4 gap-y-1">
        {player.category === 'Batsman' || player.category === 'All-Rounder' ? (
          <>
            <div className="flex justify-between">
              <span className="text-light-darkest">Runs:</span>
              <span className="text-light">{player.total_runs}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-darkest">Bat SR:</span>
              <span className="text-light">{player.battingStrikeRate?.toFixed(2) || 'N/A'}</span>
            </div>
          </>
        ) : null}
        
        {player.category === 'Bowler' || player.category === 'All-Rounder' ? (
          <>
            <div className="flex justify-between">
              <span className="text-light-darkest">Wickets:</span>
              <span className="text-light">{player.wickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-light-darkest">Economy:</span>
              <span className="text-light">{player.economyRate?.toFixed(2) || 'N/A'}</span>
            </div>
          </>
        ) : null}
        
        <div className="flex justify-between col-span-2 mt-1 pt-1 border-t border-dark-lightest">
          <span className="text-light-darkest">Value:</span>
          <span className="text-accent font-medium">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'LKR',
              maximumFractionDigits: 0
            }).format(player.value)}
          </span>
        </div>
      </div>
      
      {/* Remove button */}
      <div className="mt-auto p-3 pt-0">
        <button
          onClick={onRemove}
          disabled={isRemoving}
          className="w-full py-1.5 rounded bg-dark-lightest hover:bg-boundary/10 text-light-darker hover:text-boundary transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
        >
          {isRemoving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Removing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Remove
            </>
          )}
        </button>
      </div>
    </div>
  );
}