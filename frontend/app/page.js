'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    // If user is logged in, redirect to appropriate dashboard
    if (!loading && isAuthenticated) {
      if (user.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/players');
      }
    }
  }, [isAuthenticated, loading, user, router]);
  
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Spirit11</h1>
      <p className={styles.subtitle}>Fantasy Cricket League Platform</p>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h2>Build Your Dream Team</h2>
          <p>Select the best performing cricket players and compete with other users!</p>
        </div>
        
        <div className={styles.feature}>
          <h2>Track Performance</h2>
          <p>Monitor player stats and team performance in real-time.</p>
        </div>
        
        <div className={styles.feature}>
          <h2>Get AI Assistance</h2>
          <p>Ask Spiriter for player details and team recommendations!</p>
        </div>
      </div>
      
      <div className={styles.actions}>
        {!isAuthenticated ? (
          <>
            <Link href="/login" className={styles.primaryButton}>
              Login
            </Link>
            <Link href="/register" className={styles.secondaryButton}>
              Register
            </Link>
          </>
        ) : user.isAdmin ? (
          <Link href="/admin" className={styles.primaryButton}>
            Go to Admin Dashboard
          </Link>
        ) : (
          <Link href="/players" className={styles.primaryButton}>
            Explore Players
          </Link>
        )}
      </div>
    </div>
  );
}