'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import PlayerCard from '@/components/user/PlayerCard';
import Spiriter from '@/components/chatbot/Spiriter';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

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
    return <div className={styles.loading}>Loading players...</div>;
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className={styles.playersPage}>
      <h1>All Players</h1>
      
      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.categoryFilter}>
          <button 
            className={selectedCategory === 'All' ? styles.activeFilter : ''}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button 
            className={selectedCategory === 'Batsman' ? styles.activeFilter : ''}
            onClick={() => setSelectedCategory('Batsman')}
          >
            Batsmen
          </button>
          <button 
            className={selectedCategory === 'Bowler' ? styles.activeFilter : ''}
            onClick={() => setSelectedCategory('Bowler')}
          >
            Bowlers
          </button>
          <button 
            className={selectedCategory === 'All-Rounder' ? styles.activeFilter : ''}
            onClick={() => setSelectedCategory('All-Rounder')}
          >
            All-Rounders
          </button>
        </div>
      </div>
      
      <div className={styles.playersList}>
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map(player => (
            <PlayerCard 
              key={player.id} 
              player={player}
              showActions={false}
            />
          ))
        ) : (
          <div className={styles.noPlayers}>
            No players found matching your filters.
          </div>
        )}
      </div>
      
      <Spiriter />
    </div>
  );
}