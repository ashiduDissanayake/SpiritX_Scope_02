'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

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
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark">
        <div className="animate-pulse text-light text-xl font-semibold">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-dark-lighter py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {/* Hero Section */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light mb-4">
          Welcome to Spirit11
        </h1>
        <p className="text-xl md:text-2xl text-light-darker mb-12">
          Fantasy Cricket League Platform
        </p>
        
        {/* Cricket Ball Decoration */}
        <div className="relative w-16 h-16 mx-auto mb-12 hidden md:block">
          <div className="absolute inset-0 bg-boundary rounded-full opacity-70 animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-boundary to-accent rounded-full"></div>
        </div>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-16">
          <div className="bg-dark-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-primary/20 border border-dark-lightest">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-light mb-3">Build Your Dream Team</h2>
            <p className="text-light-darkest">Select the best performing cricket players and compete with other users!</p>
          </div>
          
          <div className="bg-dark-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-secondary/20 border border-dark-lightest">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-light mb-3">Track Performance</h2>
            <p className="text-light-darkest">Monitor player stats and team performance in real-time.</p>
          </div>
          
          <div className="bg-dark-lighter rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-accent/20 border border-dark-lightest">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-light mb-3">Get AI Assistance</h2>
            <p className="text-light-darkest">Ask Spiriter for player details and team recommendations!</p>
          </div>
        </div>
        
        {/* Cricket Pitch Background Element */}
        <div className="relative h-1 w-full max-w-xs mx-auto mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-pitch-light via-pitch to-pitch-light rounded-full"></div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-light font-bold hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
                Login
              </Link>
              <Link href="/register" className="px-8 py-3 rounded-lg border-2 border-primary/50 text-primary-light font-bold hover:border-primary hover:bg-primary/10 transform hover:-translate-y-1 transition-all duration-300">
                Register
              </Link>
            </>
          ) : user.isAdmin ? (
            <Link href="/admin" className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-light font-bold hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
              Go to Admin Dashboard
            </Link>
          ) : (
            <Link href="/players" className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-light font-bold hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-1 transition-all duration-300">
              Explore Players
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}