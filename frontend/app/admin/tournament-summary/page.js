'use client';


import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TournamentStats from '@/components/admin/TournamentStats';


import { useState, useEffect } from 'react';
import { statsService } from '@/lib/api';
import { Trophy, TrendingUp, BarChart2, Award } from 'lucide-react';

export default function TournamentStats() {
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    highestRunScorer: null,
    highestWicketTaker: null
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await statsService.getTournamentSummary();
        setStats(data);
      } catch (err) {
        setError('Failed to load tournament statistics');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-[240px] bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-cyan-400/10 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-l-purple-500/50 rounded-full animate-pulse"></div>
        </div>
        <span className="mt-4 text-cyan-400 text-lg font-bold tracking-wide">Loading statistics<span className="animate-pulse">...</span></span>
      </div>
    );

  if (loading || !isAuthenticated) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-cyan-400">Loading...</div>;

  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center p-6 text-red-400 bg-red-950/30 backdrop-blur-lg rounded-xl border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
        <svg className="w-8 h-8 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-lg font-medium">{error}</span>
      </div>
    );
  }
  
  return (

    <div className="max-w-5xl mx-auto relative p-6 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
      {/* Background neon effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      {/* Header with glowing text */}
      <div className="mb-6 text-center relative">
        <h1 className="text-2xl font-bold inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent pb-2 tracking-wider">
          TOURNAMENT STATISTICS
        </h1>
        <div className="h-px w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mt-2 shadow-[0_0_5px_rgba(139,92,246,0.5)]"></div>
      </div>
      
      {/* Main Stats with glassmorphism */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-black/50 p-5 rounded-xl border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500/20 transition-all duration-500 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                <TrendingUp className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-gray-300 font-semibold text-lg">Total Runs</h3>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              <span className="relative inline-block">
                <span className="opacity-0 group-hover:opacity-100 absolute -inset-1 blur-md bg-cyan-400/20 group-hover:animate-pulse transition-opacity duration-500 rounded-md"></span>
                <span className="relative">{stats.totalRuns.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-black/50 p-5 rounded-xl border border-purple-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-all duration-500 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                {/* Cricket stumps icon */}
                <svg className="h-6 w-6 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 4L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 4L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 20L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M17 20L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-gray-300 font-semibold text-lg">Total Wickets</h3>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
              <span className="relative inline-block">
                <span className="opacity-0 group-hover:opacity-100 absolute -inset-1 blur-md bg-purple-400/20 group-hover:animate-pulse transition-opacity duration-500 rounded-md"></span>
                <span className="relative">{stats.totalWickets}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performers with neon glow */}
      <div className="grid grid-cols-2 gap-6">
        {/* Highest Run Scorer */}
        <div className="bg-black/50 p-5 rounded-xl border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
            <Trophy className="h-5 w-5 mr-2 text-cyan-400" />
            Highest Run Scorer
          </div>
          
          {stats.highestRunScorer ? (
            <div className="relative">
              <h4 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{stats.highestRunScorer.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{stats.highestRunScorer.university}</p>
              <div className="mt-3 bg-cyan-900/30 inline-block px-3 py-1 rounded-lg text-cyan-400 font-bold border border-cyan-500/30 shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                {stats.highestRunScorer.total_runs} runs
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic text-center p-4">
              No data available
            </div>
          )}
        </div>
        
        {/* Highest Wicket Taker */}
        <div className="bg-black/50 p-5 rounded-xl border border-purple-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all duration-500 group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
            <svg className="h-5 w-5 mr-2 text-purple-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 4L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 4L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M7 20L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 20L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Highest Wicket Taker
          </div>
          
          {stats.highestWicketTaker ? (
            <div className="relative">
              <h4 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors duration-300">{stats.highestWicketTaker.name}</h4>
              <p className="text-gray-500 text-sm mt-1">{stats.highestWicketTaker.university}</p>
              <div className="mt-3 bg-purple-900/30 inline-block px-3 py-1 rounded-lg text-purple-400 font-bold border border-purple-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                {stats.highestWicketTaker.wickets} wickets
              </div>
            </div>
          ) : (
            <div className="text-gray-500 italic text-center p-4">
              No data available
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with subtle glow */}
      <div className="mt-4 pt-3 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          <span className="inline-block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-medium">
            Cricket Tournament 2025
          </span>
        </p>

    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/admin" className="flex items-center bg-gray-800 hover:bg-gray-700 transition-colors text-cyan-400 py-2 px-4 rounded-lg shadow-md border border-cyan-700">
          <span>&larr;</span>
          <span className="ml-2">Back to Dashboard</span>
        </Link>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6 ml-2 border-l-4 border-cyan-500 pl-4">
          Tournament Summary
        </h1>
        
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-700 relative overflow-hidden">
          {/* Neon accent line on top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
          
          <TournamentStats />
        </div>

      </div>
    </div>
  );
}