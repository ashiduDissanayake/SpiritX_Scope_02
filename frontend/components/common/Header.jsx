'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    // Special case for admin dashboard - only active when exactly on "/admin"
    if (path === '/admin') {
      return pathname === '/admin';
    }
    // For all other paths, keep the original logic
    return pathname === path || pathname.startsWith(`${path}/`);
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-lighter shadow-lg shadow-dark/50' : 'bg-dark bg-opacity-90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-header">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-secondary">
              Spirit11
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-light mb-1.5 transition-transform duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-light transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-light mt-1.5 transition-transform duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          
          {/* Navigation Menu */}
          <nav className={`absolute md:relative top-header left-0 right-0 md:top-0 bg-dark-lighter md:bg-transparent transition-all duration-300 ease-in-out transform ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'} md:flex md:items-center md:space-x-4`}>
            <div className="p-4 md:p-0 flex flex-col md:flex-row md:items-center md:space-x-6">
              {isAuthenticated ? (
                <>
                  {user.isAdmin ? (
                    // Admin navigation
                    <>
                      <Link 
                        href="/admin" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/admin') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                      <Link 
                        href="/admin/players" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/admin/players') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Players
                      </Link>
                      <Link 
                        href="/admin/tournament-summary" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/admin/tournament-summary') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Tournament
                      </Link>
                    </>
                  ) : (
                    // User navigation
                    <>
                      <Link 
                        href="/players" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/players') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Players
                      </Link>
                      <Link 
                        href="/select-team" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/select-team') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Select Team
                      </Link>
                      <Link 
                        href="/my-team" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/my-team') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        My Team
                      </Link>
                      <Link 
                        href="/leaderboard" 
                        className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/leaderboard') ? 'border-primary text-light' : 'border-transparent'}`}
                        onClick={closeMenu}
                      >
                        Leaderboard
                      </Link>
                    </>
                  )}
                </>
              ) : (
                // Not authenticated
                <>
                  <Link 
                    href="/login" 
                    className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/login') ? 'border-primary text-light' : 'border-transparent'}`}
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/register" 
                    className={`py-2 px-1 text-light-darker hover:text-light transition-colors border-b-2 md:border-b-2 ${isActive('/register') ? 'border-primary text-light' : 'border-transparent'}`}
                    onClick={closeMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
            
            {/* User Menu */}
            {isAuthenticated && (
              <div className="border-t md:border-t-0 md:border-l border-dark-lightest mt-2 md:mt-0 p-4 md:p-0 md:pl-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <span className="text-primary font-medium text-sm">
                      {user.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-light-darker text-sm">Hello, <span className="text-light font-medium">{user.username}</span></span>
                </div>
                <button 
                  className="px-4 py-1.5 text-sm rounded bg-dark-lightest hover:bg-primary/20 text-light-darker hover:text-primary transition-colors"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}