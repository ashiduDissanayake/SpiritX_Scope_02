'use client';

import { useState, useEffect } from 'react';
import { statsService } from '@/lib/api';
import { Trophy, TrendingUp, BarChart2, Award, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
      <div className="flex flex-col items-center justify-center p-10">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-400/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
        </div>
        <span className="mt-4 text-blue-400">Loading statistics...</span>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center p-10 text-red-400 bg-red-400/10 rounded-xl border border-red-400/30">
        <svg className="w-6 h-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{error}</span>
      </div>
    );
  }
  
  // Prepare data for pie charts
  const runsData = stats.highestRunScorer ? [
    { name: stats.highestRunScorer.name, value: stats.highestRunScorer.total_runs },
    { name: 'Others', value: stats.totalRuns - stats.highestRunScorer.total_runs }
  ] : [];
  
  const wicketsData = stats.highestWicketTaker ? [
    { name: stats.highestWicketTaker.name, value: stats.highestWicketTaker.wickets },
    { name: 'Others', value: stats.totalWickets - stats.highestWicketTaker.wickets }
  ] : [];
  
  // Custom colors for pie charts
  const COLORS = ['#3B82F6', '#1E293B'];
  const WICKET_COLORS = ['#818CF8', '#1E293B'];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 text-xs border border-gray-700 rounded shadow-lg">
          <p className="font-medium text-white">{`${payload[0].name}: ${payload[0].value}`}</p>
          <p className="text-gray-400 text-xs">{`${Math.round((payload[0].value / (payload[0].name === 'Others' ? (payload[0].payload.color === '#1E293B' && payload[1].payload.color === '#3B82F6' ? stats.totalRuns : stats.totalWickets) : (payload[0].payload.color === '#3B82F6' ? stats.totalRuns : stats.totalWickets))) * 100)}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="max-w-4xl mx-auto relative">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-all duration-300">
                <TrendingUp className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-gray-300 font-medium">Total Runs</h3>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              <span className="relative inline-block">
                <span className="opacity-0 group-hover:opacity-100 absolute -inset-1 blur-sm bg-blue-400/20 group-hover:animate-pulse transition-opacity duration-300 rounded-md"></span>
                <span className="relative">{stats.totalRuns.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-all duration-300">
                {/* Cricket stumps icon */}
                <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 4L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 4L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M16 4L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M7 20L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M17 20L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-gray-300 font-medium">Total Wickets</h3>
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
              <span className="relative inline-block">
                <span className="opacity-0 group-hover:opacity-100 absolute -inset-1 blur-sm bg-indigo-400/20 group-hover:animate-pulse transition-opacity duration-300 rounded-md"></span>
                <span className="relative">{stats.totalWickets}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Title for Charts Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center mb-4">
          <PieChartIcon className="h-5 w-5 mr-2 text-cyan-400" />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Contribution Analysis
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Runs Distribution Chart */}
          <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
              <TrendingUp className="h-4 w-4 mr-1 text-blue-400" />
              Runs Distribution
            </div>
            
            <div className="flex items-center justify-between">
              <div className="w-32 h-32">
                {stats.highestRunScorer && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={runsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {runsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                {stats.highestRunScorer && (
                  <>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                      <span className="text-xs text-gray-300">{stats.highestRunScorer.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-700 mr-2"></div>
                      <span className="text-xs text-gray-400">Others</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      <span className="text-blue-400 font-medium">{Math.round((stats.highestRunScorer.total_runs / stats.totalRuns) * 100)}%</span> of total runs
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Wickets Distribution Chart */}
          <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
              <svg className="h-4 w-4 mr-1 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 4L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 4L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 20L9 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M17 20L15 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Wickets Distribution
            </div>
            
            <div className="flex items-center justify-between">
              <div className="w-32 h-32">
                {stats.highestWicketTaker && (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={wicketsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {wicketsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={WICKET_COLORS[index % WICKET_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="flex flex-col space-y-2">
                {stats.highestWicketTaker && (
                  <>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-400 mr-2"></div>
                      <span className="text-xs text-gray-300">{stats.highestWicketTaker.name}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-700 mr-2"></div>
                      <span className="text-xs text-gray-400">Others</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      <span className="text-indigo-400 font-medium">{Math.round((stats.highestWicketTaker.wickets / stats.totalWickets) * 100)}%</span> of total wickets
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Performers */}
      <div className="mb-6">
        <h2 className="text-xl font-bold flex items-center mb-4">
          <Award className="h-5 w-5 mr-2 text-blue-400" />
          <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Top Performers
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Highest Run Scorer */}
          <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
              <TrendingUp className="h-4 w-4 mr-1 text-blue-400" />
              Highest Run Scorer
            </div>
            
            {stats.highestRunScorer ? (
              <div className="relative">
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{stats.highestRunScorer.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{stats.highestRunScorer.university}</p>
                <div className="mt-2 bg-blue-500/10 inline-block px-2 py-1 rounded text-sm text-blue-400 font-semibold">
                  {stats.highestRunScorer.total_runs} runs
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center">
                No data available
              </div>
            )}
          </div>
          
          {/* Highest Wicket Taker */}
          <div className="bg-gray-800/70 p-4 rounded-xl border border-gray-700 hover:border-indigo-400 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="text-gray-400 text-sm font-medium flex items-center mb-3">
              {/* Cricket stumps small icon */}
              <svg className="h-4 w-4 mr-1 text-indigo-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">{stats.highestWicketTaker.name}</h4>
                <p className="text-gray-500 text-xs mt-1">{stats.highestWicketTaker.university}</p>
                <div className="mt-2 bg-indigo-500/10 inline-block px-2 py-1 rounded text-sm text-indigo-400 font-semibold">
                  {stats.highestWicketTaker.wickets} wickets
                </div>
              </div>
            ) : (
              <div className="text-gray-500 italic text-center">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}