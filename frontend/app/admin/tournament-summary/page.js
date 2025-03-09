'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TournamentStats from '@/components/admin/TournamentStats';

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
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-cyan-400">Loading...</div>;
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
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