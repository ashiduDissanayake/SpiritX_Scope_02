'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { statsService } from '@/lib/api';
import { Trophy, TrendingUp, BarChart2, Award } from 'lucide-react';

export default function TournamentStatsPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalRuns: 0,
    totalWickets: 0,
    highestRunScorer: null,
    highestWicketTaker: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

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
  }, [isAuthenticated, router]);

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

          {/* Tournament Stats UI */}
          <div className="max-w-5xl mx-auto relative p-6 bg-black/40 backdrop-blur-lg rounded-xl border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
            <div className="mb-6 text-center relative">
              <h1 className="text-2xl font-bold inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent pb-2 tracking-wider">
                TOURNAMENT STATISTICS
              </h1>
              <div className="h-px w-32 mx-auto bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mt-2 shadow-[0_0_5px_rgba(139,92,246,0.5)]"></div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <StatCard icon={<TrendingUp className="h-6 w-6 text-cyan-400" />} title="Total Runs" value={stats.totalRuns} color="cyan" />
              <StatCard icon={<BarChart2 className="h-6 w-6 text-purple-400" />} title="Total Wickets" value={stats.totalWickets} color="purple" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <TopPerformer title="Highest Run Scorer" performer={stats.highestRunScorer} color="cyan" />
              <TopPerformer title="Highest Wicket Taker" performer={stats.highestWicketTaker} color="purple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component for general stats
function StatCard({ icon, title, value, color }) {
  return (
    <div className={`bg-black/50 p-5 rounded-xl border border-${color}-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 group`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${color}-500/10 rounded-lg group-hover:bg-${color}-500/20 transition-all duration-500`}>
            {icon}
          </div>
          <h3 className="text-gray-300 font-semibold text-lg">{title}</h3>
        </div>
        <div className={`text-2xl font-bold text-white group-hover:text-${color}-400 transition-colors duration-300`}>
          {value}
        </div>
      </div>
    </div>
  );
}

// Component for top performers
function TopPerformer({ title, performer, color }) {
  return (
    <div className={`bg-black/50 p-5 rounded-xl border border-${color}-500/30 backdrop-blur-md`}>
      <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
        <Trophy className={`h-5 w-5 mr-2 text-${color}-400`} />
        {title}
      </div>

      {performer ? (
        <div>
          <h4 className={`text-lg font-bold text-white group-hover:text-${color}-400`}>{performer.name}</h4>
          <p className="text-gray-500 text-sm mt-1">{performer.university}</p>
          <div className={`mt-3 bg-${color}-900/30 inline-block px-3 py-1 rounded-lg text-${color}-400 font-bold`}>
            {performer.total_runs || performer.wickets} {title.includes('Run') ? 'runs' : 'wickets'}
          </div>
        </div>
      ) : (
        <div className="text-gray-500 italic text-center p-4">No data available</div>
      )}
    </div>
  );
}
