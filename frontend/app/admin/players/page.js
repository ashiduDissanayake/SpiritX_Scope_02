'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PlayerForm from '@/components/admin/PlayerForm';

export default function PlayersManagementPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Check auth state and redirect if needed
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!user?.isAdmin) {
        router.push('/players'); // Redirect non-admin users
      }
    }
  }, [user, isAuthenticated, authLoading, router]);
  
  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await playerService.getAllPlayers();
      setPlayers(data);
      
      // Auto-select the first player if available
      if (data.length > 0) {
        handlePlayerClick(data[0]);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      loadPlayers();
    }
  }, [isAuthenticated, user]);
  
  const handleDeletePlayer = async (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      try {
        await playerService.deletePlayer(id);
        loadPlayers(); // Reload the list
        if (selectedPlayer && selectedPlayer.id === id) {
          setSelectedPlayer(null); // Clear selected player if it was deleted
        }
      } catch (error) {
        console.error('Error deleting player:', error);
        alert('Failed to delete player');
      }
    }
  };
  
  const handlePlayerClick = async (player) => {
    try {
      setLoadingDetails(true);
      const details = await playerService.getPlayerById(player.id);
      setSelectedPlayer(details);
    } catch (error) {
      console.error('Error fetching player details:', error);
      alert('Failed to load player details');
    } finally {
      setLoadingDetails(false);
    }
  };
  
  const handleCloseDetails = () => {
    setSelectedPlayer(null);
  };
  
  // Filter players by search term
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.university.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (authLoading || !isAuthenticated) {
    return <div className="flex justify-center items-center h-52 text-xl text-gray-400">Loading...</div>;
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="w-full h-screen font-sans bg-gray-950 text-gray-200 p-6">


      {/* Header */}
      <div className="mb-4">
  <Link 
    href="/admin" 
    className="inline-flex items-center space-x-1 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white text-sm rounded-lg border border-blue-600 hover:border-blue-800 transition-all">
    <span>&larr;</span>
    <span>Back to Dashboard</span>
  </Link>
</div>

<div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
        
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Players Management</h1>
        <button 
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md py-2 px-6 font-medium cursor-pointer transition-all hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/20"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Hide Form' : 'Add New Player'}
        </button>
      </div>
      
      {/* Add Player Form */}
      {showAddForm && (
        <div className="bg-gray-900 rounded-xl p-6 mb-8 shadow-xl border border-gray-800 backdrop-blur-sm">
          <PlayerForm 
            onSuccess={() => {
              loadPlayers();
              setShowAddForm(false);
            }}
          />
        </div>
      )}
      
      {/* Search Box */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-4 pl-6 border border-gray-700 rounded-lg text-base bg-gray-900 text-gray-200 transition-colors focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-inner shadow-gray-950/50"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-52 text-xl text-gray-500">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading players...
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Players Table */}
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-gray-800 backdrop-blur-sm flex-1 relative">
  {/* Table Header */}
  <div className="grid grid-cols-1 lg:grid-cols-12 p-4 bg-gray-800/50 font-medium text-gray-400 border-b border-gray-800">
    <div className="lg:col-span-3">Name</div>
    <div className="lg:col-span-3">University</div>
    <div className="lg:col-span-2">Category</div>
    <div className="lg:col-span-2">Stats</div>
    <div className="lg:col-span-2 flex justify-end">Actions</div>
  </div>
 
  {/* Table Rows */}
  {filteredPlayers.length > 0 ? (
    filteredPlayers.map(player => (
      <div
        key={player.id}
        className={`grid grid-cols-1 lg:grid-cols-12 p-4 border-b border-gray-800 transition-all cursor-pointer hover:bg-gray-800/30 ${
          selectedPlayer?.id === player.id ? 'bg-purple-900/20 border-l-4 border-l-purple-500' : ''
        }`}
        onClick={() => handlePlayerClick(player)}
      >
        <div className="lg:col-span-3 font-medium text-white py-1 lg:py-0 before:content-['Name:_'] lg:before:content-none before:font-semibold before:mr-2 before:text-gray-500">{player.name}</div>
        <div className="lg:col-span-3 text-gray-400 py-1 lg:py-0 before:content-['University:_'] lg:before:content-none before:font-semibold before:mr-2 before:text-gray-500">{player.university}</div>
        <div className="lg:col-span-2 text-gray-400 py-1 lg:py-0 before:content-['Category:_'] lg:before:content-none before:font-semibold before:mr-2 before:text-gray-500">
          {player.category === "Batsman" && (
            <span className="inline-flex px-2 py-1 rounded-md bg-blue-500/20 text-blue-400 font-medium text-xs">
              Batsman
            </span>
          )}
          {player.category === "Bowler" && (
            <span className="inline-flex px-2 py-1 rounded-md bg-green-500/20 text-green-400 font-medium text-xs">
              Bowler
            </span>
          )}
          {player.category === "All-Rounder" && (
            <span className="inline-flex px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400 font-medium text-xs">
              All-Rounder
            </span>
          )}
          {!["Batsman", "Bowler", "All-Rounder"].includes(player.category) && (
            <span>{player.category}</span>
          )}
        </div>
        <div className="lg:col-span-2 text-gray-400 py-1 lg:py-0 before:content-['Stats:_'] lg:before:content-none before:font-semibold before:mr-2 before:text-gray-500">
          <span className="text-blue-400">Runs: {player.total_runs}</span>, <span className="text-green-400">Wickets: {player.wickets}</span>
        </div>
        <div className="lg:col-span-2 flex gap-2 justify-start lg:justify-end mt-2 lg:mt-0" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/admin/players/${player.id}`}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white border-none rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors shadow-lg shadow-blue-900/30"
          >
            Edit
          </Link>
          <button
            className="bg-red-600 hover:bg-red-500 text-white border-none rounded-md px-4 py-2 text-sm font-medium cursor-pointer transition-colors shadow-lg shadow-red-900/30"
            onClick={() => handleDeletePlayer(player.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))
  ) : (
    <div className="py-12 text-center text-gray-500 italic">
      No players found matching your search.
    </div>
  )}
</div>
          
          {/* Player Details Panel */}
          {selectedPlayer && (
            <div 
            className="w-full lg:w-96 h-1/2-screen bg-gray-900 rounded-xl shadow-xl border-2 border-gray-800 backdrop-blur-sm flex flex-col fixed lg:sticky top-0 right-0 lg:top-20 lg:right-6" 
            style={{ 
              boxShadow: '0 0 10px 2px rgba(139, 92, 246, 0.5), 0 0 20px 5px rgba(96, 165, 250, 0.3)',
              height: '75vh'  // Half of the viewport height
            }}
          >
          
            {/* Details Header */}
            <div className="flex justify-between items-center p-2 bg-gray-800/50 border-b-2 border-gray-800 sticky top-0">
              <h2 className="m-0 text-lg font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Player Details</h2>
              <button 
                className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-700 bg-gray-800 text-gray-400 text-lg cursor-pointer transition-all hover:bg-gray-700 hover:text-white"
                onClick={handleCloseDetails}
              >
                ×
              </button>
            </div>
            
            {/* Details Content */}
            {loadingDetails ? (
              <div className="flex justify-center items-center h-20">
                <svg className="animate-spin h-6 w-6 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <div className="p-3">
                {/* Player Photo and Basic Info */}
                <div className="flex items-center mb-3 pb-3 border-b border-gray-700 hover:border-purple-500 transition-colors duration-300">
                  {/* Player Photo Circle */}
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500 flex-shrink-0 mr-3 bg-gray-800 flex items-center justify-center">
                    {selectedPlayer.photo ? (
                      <img 
                        src={selectedPlayer.photo} 
                        alt={selectedPlayer.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-2xl font-bold text-purple-400">
                        {selectedPlayer.name ? selectedPlayer.name.charAt(0) : "P"}
                      </div>
                    )}
                  </div>
                  
                  {/* Basic Information */}
                  <div className="flex-grow">
                    <div className="text-base font-semibold text-white mb-1">{selectedPlayer.name}</div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div>
                        <strong className="font-medium text-gray-500">University:</strong> 
                        <span className="text-gray-300 ml-1">{selectedPlayer.university}</span>
                      </div>
                      <div>
                        <strong className="font-medium text-gray-500">Category:</strong> 
                        <span className="text-gray-300 ml-1">{selectedPlayer.category}</span>
                      </div>
                      <div>
                        <strong className="font-medium text-gray-500">Value:</strong> 
                        <span className="text-emerald-400 ml-1">{selectedPlayer.value.toLocaleString()}</span>
                      </div>
                      <div>
                        <strong className="font-medium text-gray-500">Points:</strong> 
                        <span className="text-amber-400 ml-1">{selectedPlayer.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  {/* Batting Stats */}
                  <div className="border-2 border-gray-800 rounded-lg p-2 bg-gray-800/20 hover:border-blue-500 transition-colors duration-300">
                    <h3 className="mt-0 mb-2 text-sm font-semibold text-blue-400 inline-block px-2 py-1 rounded bg-blue-900/30 border-l-2 border-blue-500">Batting</h3>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Runs:</strong> 
                        <span className="text-blue-300">{selectedPlayer.total_runs}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Balls:</strong> 
                        <span className="text-gray-300">{selectedPlayer.balls_faced}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Innings:</strong> 
                        <span className="text-gray-300">{selectedPlayer.innings_played}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Average:</strong> 
                        <span className="text-blue-300">{Number(selectedPlayer.battingAverage).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Strike Rate:</strong> 
                        <span className="text-blue-300">{Number(selectedPlayer.battingStrikeRate).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bowling Stats */}
                  <div className="border-2 border-gray-800 rounded-lg p-2 bg-gray-800/20 hover:border-green-500 transition-colors duration-300">
                    <h3 className="mt-0 mb-2 text-sm font-semibold text-green-400 inline-block px-2 py-1 rounded bg-green-900/30 border-l-2 border-green-500">Bowling</h3>
                    <div className="grid grid-cols-1 gap-1">
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Wickets:</strong> 
                        <span className="text-green-300">{selectedPlayer.wickets}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Overs:</strong> 
                        <span className="text-gray-300">{selectedPlayer.overs_bowled}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Runs Given:</strong> 
                        <span className="text-gray-300">{selectedPlayer.runs_conceded}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Economy:</strong> 
                        <span className="text-green-300">{Number(selectedPlayer.economyRate).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <strong className="font-medium text-gray-500">Strike Rate:</strong> 
                        <span className="text-green-300">{Number(selectedPlayer.bowlingStrikeRate).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Meta Information */}
                <div className="border-t border-gray-700 pt-2 hover:border-gray-500 transition-colors duration-300 mt-1">
                  <h3 className="mt-0 mb-2 text-sm font-semibold text-gray-400 inline-block px-2 py-1 rounded bg-gray-800/50 border-l-2 border-gray-500">Meta Info</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <strong className="font-medium text-gray-500">Created:</strong> 
                      <span className="text-gray-400 ml-1">{new Date(selectedPlayer.created_at).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <strong className="font-medium text-gray-500">Updated:</strong> 
                      <span className="text-gray-400 ml-1">{new Date(selectedPlayer.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      )}
    </div>
  );
}