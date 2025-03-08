'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TournamentStats from '@/components/admin/TournamentStats';
import styles from './page.module.css';

export default function AdminDashboard() {
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
    <div className={styles.adminDashboard}>
      <h1>Admin Dashboard</h1>
      
      <div className={styles.adminModules}>
        <div className={styles.moduleGrid}>
          <Link href="/admin/players" className={styles.moduleCard}>
            <h2>Players Management</h2>
            <p>View, add, update, and delete players</p>
          </Link>
          
          <Link href="/admin/tournament-summary" className={styles.moduleCard}>
            <h2>Tournament Summary</h2>
            <p>View overall tournament statistics</p>
          </Link>
        </div>
        
        <div className={styles.statsSummary}>
          <TournamentStats />
        </div>
      </div>
    </div>
  );
}