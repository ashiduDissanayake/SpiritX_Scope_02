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
    <div className="min-h-screen bg-[#020611] text-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-indigo-900/30 pb-4 pt-6 px-6">
          <Link href="/admin/players" className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Players
          </Link>
          <h1 className="text-2xl font-bold text-white">
            Edit Player: <span className="text-indigo-400">{player?.name}</span>
          </h1>
        </div>
       
        {player && (
          <div className="bg-[#0a101f] rounded-xl shadow-2xl shadow-indigo-900/10 overflow-hidden m-6">
            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 p-4 border-b border-indigo-800/30">
              <h2 className="text-xl font-semibold text-indigo-300">Player Details</h2>
            </div>
            <div className="p-6">
              <PlayerForm
                playerId={playerId}
                onSuccess={() => {
                  router.push('/admin/players');
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}