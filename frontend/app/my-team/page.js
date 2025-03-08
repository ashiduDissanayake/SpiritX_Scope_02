'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTeam } from '@/context/TeamContext';
import TeamDisplay from '@/components/user/TeamDisplay';
import BudgetTracker from '@/components/user/BudgetTracker';
import TeamCompletenessIndicator from '@/components/user/TeamCompletenessIndicator';
import Spiriter from '@/components/chatbot/Spiriter';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export default function MyTeamPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { team, loading: teamLoading, loadTeam } = useTeam();
  const router = useRouter();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  useEffect(() => {
    if (isAuthenticated) {
      loadTeam();
    }
  }, [isAuthenticated, loadTeam]);
  
  if (authLoading || (teamLoading && isAuthenticated)) {
    return <div className={styles.loading}>Loading team data...</div>;
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className={styles.myTeamPage}>
      <h1>My Team</h1>
      
      <div className={styles.teamContainer}>
        <div className={styles.statsContainer}>
          <BudgetTracker />
          <TeamCompletenessIndicator />
        </div>
        
        <TeamDisplay />
        
        {team.totalPlayers < 11 && (
          <div className={styles.actionContainer}>
            <p>Your team is incomplete. Add more players to complete your team.</p>
            <Link href="/select-team" className={styles.selectMoreButton}>
              Select More Players
            </Link>
          </div>
        )}
      </div>
      
      <Spiriter />
    </div>
  );
}