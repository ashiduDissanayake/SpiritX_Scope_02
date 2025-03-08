'use client';
import { useState, useEffect } from 'react';
import { playerService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import PlayerForm from '@/components/admin/PlayerForm';
import styles from './page.module.css';

export default function EditPlayerPage() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const playerId = params.id;
  
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
  
  useEffect(() => {
    const fetchPlayer = async () => {
      if (!playerId || !isAuthenticated || !user?.isAdmin) return;
      
      try {
        setLoading(true);
        const data = await playerService.getPlayerById(playerId);
        setPlayer(data);
      } catch (err) {
        setError('Failed to load player data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlayer();
  }, [playerId, isAuthenticated, user]);
  
  if (authLoading || loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className={styles.editPlayerPage}>
      <div className={styles.header}>
        <Link href="/admin/players" className={styles.backButton}>
          &larr; Back to Players
        </Link>
        <h1>Edit Player: {player?.name}</h1>
      </div>
      
      {player && (
        <PlayerForm 
          playerId={playerId} 
          onSuccess={() => {
            router.push('/admin/players');
          }}
        />
      )}
    </div>
  );
}