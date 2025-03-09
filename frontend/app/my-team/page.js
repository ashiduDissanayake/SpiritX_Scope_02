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
import { io } from 'socket.io-client';
export default function MyTeamPage() {
  const { isAuthenticated, loading: authLoading, user } = useAuth(); // Added 'user'
  const { team, loading: teamLoading, loadTeam } = useTeam();
  const router = useRouter();
  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }

    if (!isAuthenticated) return;

    // Initial team load
    loadTeam();

    // Connect to WebSocket server
    const socket = io("http://localhost:3001", {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server from MyTeamPage");
      
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("playerUpdated", (updatedPlayer) => {
      console.log("Player updated:", updatedPlayer);
      loadTeam();
    });

    socket.on("playerDeleted", (deletedPlayer) => {
      console.log("Player deleted:", deletedPlayer);
      loadTeam();
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, authLoading, router, loadTeam, user]); // Added 'user' to dependencies
  
  if (authLoading || (teamLoading && isAuthenticated)) {
    return (
      <div className="pt-header min-h-screen flex flex-col items-center justify-center bg-dark text-light p-6">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-light text-lg font-medium">Loading team data...</p>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="pt-header bg-dark min-h-screen text-light p-4 md:p-6">
      {/* Page Header with Trophy Decoration */}
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">My Team</h1>
        <div className="hidden md:block absolute -top-2 right-4 w-10 h-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary/30" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        {/* Stats Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <BudgetTracker />
          <TeamCompletenessIndicator />
        </div>
        
        {/* Team Display */}
        <div className="bg-dark-lighter rounded-xl border border-dark-lightest p-4 md:p-6 mb-6">
          <TeamDisplay />
        </div>
        
        {/* Action Container */}
        {team.totalPlayers < 11 && (
          <div className="bg-dark-lighter rounded-xl border border-dark-lightest p-5 flex flex-col md:flex-row items-center justify-between gap-4 animate-pulse-slow">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-boundary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-light-darker">Your team is incomplete. Add more players to complete your team.</p>
            </div>
            <Link href="/select-team" 
              className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-light rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Select More Players</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
        
        {/* Cricket Pitch Decoration */}
        <div className="w-full flex justify-center my-8">
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-30"></div>
        </div>
      </div>
      
      <Spiriter />
    </div>
  );
}