'use client';
import { useEffect, useState } from 'react';
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
  const { team, loading: teamLoading } = useTeam();
  const [showRestrictedMessage, setShowRestrictedMessage] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Handle authentication check and restricted message
    if (!authLoading && !isAuthenticated) {
      setShowRestrictedMessage(true);
      const timer = setTimeout(() => {
        setShowRestrictedMessage(false);
        router.push("/login");
      }, 2000); // 2 seconds delay

      // Cleanup timer on component unmount or if dependencies change
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, authLoading, router]);
  
  // Remove this duplicate effect - team loading is already handled in TeamContext
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     loadTeam();
  //   }
  // }, [isAuthenticated, loadTeam]);
  
  if (authLoading || (teamLoading && isAuthenticated)) {
    return <div className={styles.loading}>Loading team data...</div>;
  }
  
  if (showRestrictedMessage) {
    return (
      <div className={styles.restrictedMessage}>
        This is a restricted page. Redirecting to login in 2 seconds...
      </div>
    );
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