'use client';
import { useState, useEffect } from 'react';
import { teamService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await teamService.getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLeaderboard();
  }, []);
  
  // Format number with 2 decimal places
  const formatNumber = (num) => {
    return num !== null && num !== undefined ? Number(num).toFixed(2) : 'N/A';
  };
  
  if (loading) {
    return (
      <div className="pt-header min-h-screen flex flex-col items-center justify-center bg-dark text-light p-6">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-light text-lg font-medium">Loading leaderboard...</p>
      </div>
    );
  }
  
  return (
    <div className="pt-header min-h-screen bg-dark text-light p-4 md:p-6">
      {/* Page Header with Trophy Decoration */}
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Leaderboard</h1>
        <div className="hidden md:flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {leaderboard.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center bg-dark-lighter border border-dashed border-dark-lightest rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-darkest mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h3 className="text-xl text-light mb-2">No teams yet</h3>
            <p className="text-light-darkest max-w-md">
              No teams have been completed yet. Be the first to complete your team and claim the top spot on the leaderboard!
            </p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden shadow-lg border border-dark-lightest bg-dark-lighter">
            {/* Table Header */}
            <div className="grid grid-cols-12 bg-dark-lightest py-4 px-6 text-light-darker font-medium">
              <div className="col-span-2 md:col-span-2 text-center">#</div>
              <div className="col-span-6 md:col-span-7">Username</div>
              <div className="col-span-4 md:col-span-3 text-right">Points</div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-dark-lightest">
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.userId} 
                  className={`grid grid-cols-12 py-4 px-6 items-center ${
                    user && entry.userId === user.id 
                      ? 'bg-primary/5 border-l-4 border-primary' 
                      : index % 2 === 0 ? 'bg-dark-lightest/20' : ''
                  }`}
                >
                  <div className="col-span-2 md:col-span-2 text-center flex justify-center">
                    {index === 0 ? (
                      <div className="bg-primary/20 w-8 h-8 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : index === 1 ? (
                      <div className="bg-secondary/20 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-secondary font-bold">2</span>
                      </div>
                    ) : index === 2 ? (
                      <div className="bg-accent/20 w-8 h-8 rounded-full flex items-center justify-center">
                        <span className="text-accent font-bold">3</span>
                      </div>
                    ) : (
                      <span className="text-light-darker">{index + 1}</span>
                    )}
                  </div>
                  <div className="col-span-6 md:col-span-7">
                    <div className="flex items-center">
                      <span className={`font-medium ${user && entry.userId === user.id ? 'text-primary' : 'text-light'}`}>
                        {entry.username}
                      </span>
                      {user && entry.userId === user.id && (
                        <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right font-bold">
                    <span className={`${
                      index === 0 ? 'text-primary' : 
                      index === 1 ? 'text-secondary' : 
                      index === 2 ? 'text-accent' : 
                      'text-light'
                    }`}>
                      {formatNumber(entry.totalPoints)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Stats Summary */}
        {leaderboard.length > 0 && (
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-light-darkest">
            <p>Total Teams: {leaderboard.length}</p>
            {user && leaderboard.findIndex(entry => entry.userId === user.id) !== -1 ? (
              <p>
                Your Rank: #{leaderboard.findIndex(entry => entry.userId === user.id) + 1} of {leaderboard.length}
              </p>
            ) : (
              <p>Complete your team to join the leaderboard!</p>
            )}
          </div>
        )}
        
        {/* Cricket Pitch Decoration */}
        <div className="w-full flex justify-center my-8">
          <div className="h-1 w-48 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-30"></div>
        </div>
      </div>
    </div>
  );
}