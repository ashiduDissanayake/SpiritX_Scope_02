'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import PlayerCard from '@/components/user/PlayerCard';
import Spiriter from '@/components/chatbot/Spiriter';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await playerService.getAllPlayers();
        
        // Fetch detailed stats for each player
        const playersWithStats = await Promise.all(
          data.map(async player => {
            const details = await playerService.getPlayerById(player.id);
            return details;
          })
        );
        
        setPlayers(playersWithStats);
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated) {
      fetchPlayers();
    }
  }, [isAuthenticated]);
  
  // Filter players by category and search term
  const filteredPlayers = players.filter(player => {
    const categoryMatch = selectedCategory === 'All' || player.category === selectedCategory;
    const searchMatch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        player.university.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });
  
  if (authLoading || (loading && isAuthenticated)) {
    return (
      <div className="pt-header min-h-screen flex flex-col items-center justify-center bg-dark text-light p-6">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-light text-lg font-medium">Loading players...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="pt-header bg-dark min-h-screen text-light p-4 md:p-6">
      {/* Page Header with Cricket Ball Decoration */}
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">All Players</h1>
        <div className="hidden md:block absolute -top-2 right-4 w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-boundary/20 animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-boundary/40 border border-boundary/20"></div>
        </div>
      </div>
      
      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search players or universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 bg-dark-lighter border border-dark-lightest rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 text-light placeholder-light-darkest"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-3.5 h-5 w-5 text-light-darkest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button 
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === 'All' 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button 
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === 'Batsman' 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
            }`}
            onClick={() => setSelectedCategory('Batsman')}
          >
            Batsmen
          </button>
          <button 
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === 'Bowler' 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
            }`}
            onClick={() => setSelectedCategory('Bowler')}
          >
            Bowlers
          </button>
          <button 
            className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
              selectedCategory === 'All-Rounder' 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
            }`}
            onClick={() => setSelectedCategory('All-Rounder')}
          >
            All-Rounders
          </button>
        </div>
        
        {/* Stats Indicator */}
        <div className="flex justify-between items-center text-sm text-light-darkest px-1">
          <span>Total Players: {players.length}</span>
          <span>Showing: {filteredPlayers.length} results</span>
        </div>
      </div>
      
      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player}
              showActions={false}
            />
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-dark-lighter border border-dashed border-dark-lightest rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-darkest mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.071 13.07l-1.414-1.414M10 18a8 8 0 110-16 8 8 0 010 16zm0 0v4m0-17V1" />
            </svg>
            <p className="text-xl text-light mb-2">No players found</p>
            <p className="text-light-darkest max-w-md">We couldn't find any players matching your current filters. Try adjusting your search or category selection.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-dark-lightest hover:bg-primary/10 text-light-darker hover:text-primary transition-colors rounded-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Cricket Pitch Decoration */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-48 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-30"></div>
      </div>
      
      <Spiriter />
    </div>
  );
}