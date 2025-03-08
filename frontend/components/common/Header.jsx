'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isActive = (path) => {
    if (path === "/admin") {
      return pathname === path; // Exact match for Dashboard
    }
    return pathname === path || pathname.startsWith(`${path}/`); // Subpath match for others
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Spirit11</Link>
        </div>
        
        <button 
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
          {isAuthenticated ? (
            <>
              {user.isAdmin ? (
                // Admin navigation
                <>
                  <Link 
                    href="/admin" 
                    className={isActive('/admin') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/admin/players" 
                    className={isActive('/admin/players') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    Players
                  </Link>
                  <Link 
                    href="/admin/tournament-summary" 
                    className={isActive('/admin/tournament-summary') ? styles.active : ''}
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
                    className={isActive('/players') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    Players
                  </Link>
                  <Link 
                    href="/select-team" 
                    className={isActive('/select-team') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    Select Team
                  </Link>
                  <Link 
                    href="/my-team" 
                    className={isActive('/my-team') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    My Team
                  </Link>
                  <Link 
                    href="/leaderboard" 
                    className={isActive('/leaderboard') ? styles.active : ''}
                    onClick={closeMenu}
                  >
                    Leaderboard
                  </Link>
                </>
              )}
              
              <div className={styles.userMenu}>
                <span className={styles.username}>Hello, {user.username}</span>
                <button 
                  className={styles.logoutButton}
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            // Not authenticated
            <>
              <Link 
                href="/login" 
                className={isActive('/login') ? styles.active : ''}
                onClick={closeMenu}
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className={isActive('/register') ? styles.active : ''}
                onClick={closeMenu}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}