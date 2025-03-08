'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PlayerForm from '@/components/admin/PlayerForm';
import styles from './page.module.css';

export default function PlayersManagementPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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
      } catch (error) {
        console.error('Error deleting player:', error);
        alert('Failed to delete player');
      }
    }
  };
  
  // Filter players by search term
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.university.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (authLoading || !isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className={styles.playersManagement}>
      <div className={styles.header}>
        <h1>Players Management</h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Hide Form' : 'Add New Player'}
        </button>
      </div>
      
      {showAddForm && (
        <div className={styles.formContainer}>
          <PlayerForm 
            onSuccess={() => {
              loadPlayers();
              setShowAddForm(false);
            }}
          />
        </div>
      )}
      
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      
      {loading ? (
        <div className={styles.loading}>Loading players...</div>
      ) : (
        <div className={styles.playersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.nameColumn}>Name</div>
            <div className={styles.universityColumn}>University</div>
            <div className={styles.categoryColumn}>Category</div>
            <div className={styles.statsColumn}>Stats</div>
            <div className={styles.actionsColumn}>Actions</div>
          </div>
          
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
              <div key={player.id} className={styles.tableRow}>
                <div className={styles.nameColumn}>{player.name}</div>
                <div className={styles.universityColumn}>{player.university}</div>
                <div className={styles.categoryColumn}>{player.category}</div>
                <div className={styles.statsColumn}>
                  Runs: {player.total_runs}, Wickets: {player.wickets}
                </div>
                <div className={styles.actionsColumn}>
                  <Link href={`/admin/players/${player.id}`} className={styles.editButton}>
                    Stats
                  </Link>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => handleDeletePlayer(player.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noPlayers}>
              No players found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}