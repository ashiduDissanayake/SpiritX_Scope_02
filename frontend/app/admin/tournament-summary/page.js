'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TournamentStats from '@/components/admin/TournamentStats';
import styles from './page.module.css';

export default function TournamentSummaryPage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // Check auth state and redirect if needed
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!user?.isAdmin) {
        router.push('/players'); // Redirect non-admin users
      }
    }
  }, [user, isAuthenticated, loading, router]);
  
  if (loading || !isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className={styles.tournamentSummaryPage}>
      <div className={styles.header}>
        <Link href="/admin" className={styles.backButton}>
          &larr; Back to Dashboard
        </Link>
        <h1>Tournament Summary</h1>
      </div>
      
      <div className={styles.statsContainer}>
        <TournamentStats />
      </div>
    </div>
  );
}