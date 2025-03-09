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
        <div className={styles.contentContainer}>
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
                <div 
                  key={player.id} 
                  className={`${styles.tableRow} ${selectedPlayer?.id === player.id ? styles.selectedRow : ''}`}
                  onClick={() => handlePlayerClick(player)}
                >
                  <div className={styles.nameColumn}>{player.name}</div>
                  <div className={styles.universityColumn}>{player.university}</div>
                  <div className={styles.categoryColumn}>{player.category}</div>
                  <div className={styles.statsColumn}>
                    Runs: {player.total_runs}, Wickets: {player.wickets}
                  </div>
                  <div className={styles.actionsColumn} onClick={(e) => e.stopPropagation()}>
                    <Link href={`/admin/players/${player.id}`} className={styles.editButton}>
                      Edit
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
          
          {selectedPlayer && (
            <div className={styles.playerDetails}>
              <div className={styles.detailsHeader}>
                <h2>Player Details</h2>
                <button 
                  className={styles.closeButton}
                  onClick={handleCloseDetails}
                >
                  ×
                </button>
              </div>
              
              {loadingDetails ? (
                <div className={styles.loading}>Loading details...</div>
              ) : (
                <div className={styles.detailsContent}>
                  <div className={styles.detailSection}>
                    <h3>Basic Information</h3>
                    <div className={styles.detailRow}>
                      <strong>Name:</strong> {selectedPlayer.name}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>University:</strong> {selectedPlayer.university}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Category:</strong> {selectedPlayer.category}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Player Value:</strong> {selectedPlayer.value.toLocaleString()}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Points:</strong> {selectedPlayer.points}
                    </div>
                  </div>
                  
                  <div className={styles.statsSection}>
                    <h3>Batting Stats</h3>
                    <div className={styles.detailRow}>
                      <strong>Total Runs:</strong> {selectedPlayer.total_runs}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Balls Faced:</strong> {selectedPlayer.balls_faced}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Innings Played:</strong> {selectedPlayer.innings_played}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Batting Average:</strong> {selectedPlayer.battingAverage}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Strike Rate:</strong> {selectedPlayer.battingStrikeRate}
                    </div>
                  </div>
                  
                  <div className={styles.statsSection}>
                    <h3>Bowling Stats</h3>
                    <div className={styles.detailRow}>
                      <strong>Wickets:</strong> {selectedPlayer.wickets}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Overs Bowled:</strong> {selectedPlayer.overs_bowled}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Runs Conceded:</strong> {selectedPlayer.runs_conceded}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Economy Rate:</strong> {selectedPlayer.economyRate}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Bowling Strike Rate:</strong> {selectedPlayer.bowlingStrikeRate}
                    </div>
                  </div>
                  
                  <div className={styles.metaSection}>
                    <h3>Meta Information</h3>
                    <div className={styles.detailRow}>
                      <strong>Created:</strong> {new Date(selectedPlayer.created_at).toLocaleDateString()}
                    </div>
                    <div className={styles.detailRow}>
                      <strong>Last Updated:</strong> {new Date(selectedPlayer.updated_at).toLocaleDateString()}
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