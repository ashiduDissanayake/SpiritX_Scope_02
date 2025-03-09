"use client";
import { useState, useEffect, useRef } from "react";
import { playerService } from "@/lib/api";
import PlayerCard from "@/components/user/PlayerCard";
import BudgetTracker from "@/components/user/BudgetTracker";
import TeamCompletenessIndicator from "@/components/user/TeamCompletenessIndicator";
import Spiriter from "@/components/chatbot/Spiriter";
import { useAuth } from "@/context/AuthContext";
import { useTeam } from "@/context/TeamContext";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
export default function SelectTeamPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { team,loadTeam } = useTeam();
  const router = useRouter();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage] = useState(8);
  
  // Scroll state for sticky mini-status
  const [showMiniStatus, setShowMiniStatus] = useState(false);
  const statsRef = useRef(null);
  console.log(team);

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const socket = io("http://localhost:3001", {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const data = await playerService.getAllPlayers();
        const playersWithStats = await Promise.all(
          data.map(async (player) => {
            const details = await playerService.getPlayerById(player.id);
            return details;
          })
        );
        setPlayers(playersWithStats);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });
    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    socket.on("playerUpdated", (updatedPlayer) => {
      console.log("Player updated:", updatedPlayer);
      setPlayers((prevPlayers) =>
        prevPlayers.map((player) =>
          player.id === updatedPlayer.id ? updatedPlayer : player
        )
      );
      loadTeam();
    });

    socket.on("playerCreated", (newPlayer) => {
      console.log("Player created:", newPlayer);
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    });

    socket.on("playerDeleted", (deletedPlayer) => {
      console.log("Player deleted:", deletedPlayer);
      setPlayers((prevPlayers) => {
        const newPlayers = [...prevPlayers.filter((player) => player.id !== Number(deletedPlayer.id))];
        console.log("Updated players after deletion:", newPlayers);
        return newPlayers;
      });
      loadTeam();
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  // Set up scroll event listener for mini-status visibility
  useEffect(() => {
    const handleScroll = () => {
      if (statsRef.current) {
        const statsPosition = statsRef.current.getBoundingClientRect().bottom;
        // Show mini-status when original stats are scrolled out of view
        setShowMiniStatus(statsPosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter players by category and search term
  const filteredPlayers = players.filter((player) => {
    const categoryMatch =
      selectedCategory === "All" || player.category === selectedCategory;
    const searchMatch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.university.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });
  
  // Get current page players
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Load more players
  const loadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  if (authLoading || (loading && isAuthenticated)) {
    return (
      <div className="pt-header min-h-screen flex flex-col items-center justify-center bg-dark text-light p-6">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-light text-lg font-medium">Loading players...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Extract team budget and player count stats for mini-status
  const remainingBudget = team?.remainingBudget || 0;
  const playerCount = team?.players?.length || 0;
  const maxPlayers = 11;
  const playersNeeded = maxPlayers - playerCount;

  return (
    <div className="pt-header bg-dark min-h-screen text-light p-4 md:p-6">
      {/* Mini Status Bar - Fixed at left, slides in when scrolling past original stats */}
      <div className={`fixed top-20 left-0 z-20 transform transition-transform duration-300 ${
        showMiniStatus ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="bg-dark-lighter border border-dark-lightest rounded-r-lg shadow-md p-3 flex flex-col space-y-2">
          <div className="flex items-center text-primary border-b border-dark-lightest pb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95a1 1 0 001.715 1.029zM6 12a2 2 0 114 0 2 2 0 01-4 0zm6 0a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
            </svg>
            <div className="flex flex-col">
              <span className="font-medium">{remainingBudget.toLocaleString()}</span>
              <span className="text-light-darkest text-xs">Budget</span>
            </div>
          </div>
          
          <div className="flex items-center text-boundary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <div className="flex flex-col">
              <span className="font-medium">{playersNeeded > 0 ? `${playersNeeded} needed` : 'Complete!'}</span>
              <span className="text-light-darkest text-xs">Players</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Page Header with Cricket Ball Decoration */}
      <div className="flex items-center justify-between mb-8 relative">
        <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">Select Your Team</h1>
        <div className="hidden md:block absolute -top-2 right-4 w-10 h-10">
          <div className="absolute inset-0 rounded-full bg-boundary/20 animate-ping opacity-75"></div>
          <div className="absolute inset-0 rounded-full bg-boundary/40 border border-boundary/20"></div>
        </div>
      </div>
      
      <div className="mb-8 space-y-6">
        {/* Team Management Stats */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BudgetTracker />
          <TeamCompletenessIndicator />
        </div>
        
        {/* Filters Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search players or universities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-lighter border border-dark-lightest rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 text-light placeholder-light-darkest"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-3 top-3.5 h-5 w-5 text-light-darkest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'All' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
              }`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'Batsman' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
              }`}
              onClick={() => setSelectedCategory('Batsman')}
            >
              Batsmen
            </button>
            <button 
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'Bowler' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
              }`}
              onClick={() => setSelectedCategory('Bowler')}
            >
              Bowlers
            </button>
            <button 
              className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
                selectedCategory === 'All-Rounder' 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'border-dark-lightest text-light-darker hover:border-primary/50 hover:text-light'
              }`}
              onClick={() => setSelectedCategory('All-Rounder')}
            >
              All-Rounders
            </button>
          </div>
          
          {/* Stats Indicator */}
          <div className="flex justify-between items-center text-sm text-light-darkest px-1">
            <span>Total Players: {filteredPlayers.length}</span>
            <span>Showing: {Math.min(currentPage * playersPerPage, filteredPlayers.length)} of {filteredPlayers.length}</span>
          </div>
        </div>
      </div>
      
      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {currentPlayers.length > 0 ? (
          currentPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-dark-lighter border border-dashed border-dark-lightest rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-light-darkest mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.071 13.07l-1.414-1.414M10 18a8 8 0 110-16 8 8 0 010 16zm0 0v4m0-17V1" />
            </svg>
            <p className="text-xl text-light mb-2">No players found</p>
            <p className="text-light-darkest max-w-md">We couldn't find any players matching your current filters. Try adjusting your search or category selection.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-dark-lightest hover:bg-primary/10 text-light-darker hover:text-primary transition-colors rounded-lg"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      
      {/* Pagination / Load More */}
      {filteredPlayers.length > playersPerPage && (
        <div className="mt-8 flex flex-col items-center space-y-4">          
          {/* Pagination navigation (desktop) */}
          <div className="hidden md:flex space-x-1">
            {/* Previous button */}
            <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-dark-lightest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => {
              // Show pages: first, last, current, and one before/after current
              const pageNum = index + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                pageNum === currentPage ||
                pageNum === currentPage - 1 ||
                pageNum === currentPage + 1
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`w-8 h-8 rounded ${
                      currentPage === pageNum
                        ? 'bg-primary text-light'
                        : 'border border-dark-lightest hover:bg-dark-lightest'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              }
              // Show ellipsis for skipped pages
              if (
                (pageNum === 2 && currentPage > 3) ||
                (pageNum === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNum} className="px-2">...</span>;
              }
              return null;
            })}
            
            {/* Next button */}
            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-dark-lightest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Current page indicator */}
          <p className="text-sm text-light-darker">
            Page {currentPage} of {totalPages}
          </p>
        </div>
      )}
      
      {/* Cricket Pitch Decoration */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-48 bg-gradient-to-r from-transparent via-pitch to-transparent rounded-full opacity-30"></div>
      </div>
      
      <Spiriter />
    </div>
  );
}