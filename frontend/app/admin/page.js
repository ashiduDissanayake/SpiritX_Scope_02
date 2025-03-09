'use client';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TournamentStats from '@/components/admin/TournamentStats';
import { Users, BarChart2, Shield, UserPlus, UserX, Edit2 } from 'lucide-react';

export default function AdminDashboard() {
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
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="h-4 w-4 animate-bounce bg-blue-400 rounded-full"></div>
          <div className="h-4 w-4 animate-bounce bg-blue-400 rounded-full" style={{animationDelay: '0.2s'}}></div>
          <div className="h-4 w-4 animate-bounce bg-blue-400 rounded-full" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }
  
  if (!user?.isAdmin) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 relative overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}}></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-blue-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              href="/admin/players" 
              className="relative group bg-gray-800 border border-gray-700 hover:border-blue-400 p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center space-x-4 mb-4 relative">
                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold">Players Management</h2>
              </div>
              

              
              <div className="flex space-x-3 mt-2">
                <div className="flex items-center text-sm text-gray-300 group-hover:text-blue-300 transition-colors">
                  <Users className="h-4 w-4 mr-1" />
                  <span>View</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 group-hover:text-green-300 transition-colors">
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span>Add</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 group-hover:text-yellow-300 transition-colors">
                  <Edit2 className="h-4 w-4 mr-1" />
                  <span>Update</span>
                </div>
                <div className="flex items-center text-sm text-gray-300 group-hover:text-red-300 transition-colors">
                  <UserX className="h-4 w-4 mr-1" />
                  <span>Delete</span>
                </div>
              </div>
              
              <div className="w-full h-px bg-gradient-to-r from-blue-400 via-indigo-400 to-transparent absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
            
            <Link 
              href="/admin/tournament-summary" 
              className="group bg-gray-800 border border-gray-700 hover:border-blue-400 p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center space-x-4 mb-4 relative">
                <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                  <BarChart2 className="h-6 w-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold">Tournament Summary</h2>
              </div>
              
              <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                View overall tournament statistics
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-blue-400 via-indigo-400 to-transparent absolute bottom-0 left-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Link>
          </div>
          
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg hover:shadow-blue-400/10 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5"></div>
            
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2 relative">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Tournament Statistics
              </span>
            </h2>
            
            <div className="relative">
              <TournamentStats />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}