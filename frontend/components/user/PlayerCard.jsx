"use client";
import { useState, useEffect } from "react";
import { useTeam } from "@/context/TeamContext";
import { createPortal } from "react-dom";

export default function PlayerCard({ player, showActions = true }) {
  const [showModal, setShowModal] = useState(false);
  const { team, addPlayer } = useTeam();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  // Check if player is already in team
  const isInTeam = team.players.some((p) => p.id === player.id);

  // Handle client-side portal rendering
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Format number to show 2 decimal places if needed
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "N/A";
    if (num === "Undefined") return "Undefined";
    return typeof num === "number" ? Number(num).toFixed(2) : num;
  };

  // Format currency (player value)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle add player to team
  const handleAddPlayer = async () => {
    setError(null);
    setLoading(true);

    try {
      const result = await addPlayer(player.id);

      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to add player to team.");
    } finally {
      setLoading(false);
    }
  };

  // Open modal
  const openModal = () => setShowModal(true);

  // Close modal
  const closeModal = () => setShowModal(false);

  // Prevent event bubbling
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      {/* Player Card */}
      <div 
        onClick={openModal}
        className={`bg-dark-lighter rounded-xl overflow-hidden border border-dark-lightest transition-all duration-300 shadow-md hover:shadow-primary/10 cursor-pointer hover:translate-y-[-2px]`}
      >
        {/* Category indicator */}
        <div className={`absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] 
          ${player.category === 'Batsman' ? 'border-t-primary/80 border-r-primary/80' : 
            player.category === 'Bowler' ? 'border-t-secondary/80 border-r-secondary/80' : 
            'border-t-accent/80 border-r-accent/80'}`}>
        </div>

        {/* Player header */}
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-light font-bold text-lg">{player.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-light-darker text-sm">{player.university}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full 
              ${player.category === 'Batsman' ? 'bg-primary/20 text-primary-light' :
                player.category === 'Bowler' ? 'bg-secondary/20 text-secondary-light' :
                'bg-accent/20 text-accent-light'}`}
            >
              {player.category}
            </span>
          </div>
          
          {/* Player Value (Added here) */}
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-light-darkest">Value:</span>
            <span className="text-accent font-semibold text-sm">{formatCurrency(player.value)}</span>
          </div>
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className="p-4 pt-0" onClick={stopPropagation}>
            {!isInTeam ? (
              <div className="space-y-2">
                <button
                  onClick={handleAddPlayer}
                  disabled={loading || isInTeam}
                  className="w-full py-2 rounded-md bg-primary text-light disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors text-sm font-medium"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </span>
                  ) : "Add to Team"}
                </button>
                {error && <p className="text-boundary text-xs text-center">{error}</p>}
              </div>
            ) : (
              <div className="w-full py-2 bg-secondary/10 border border-secondary/30 rounded-md text-secondary text-sm font-medium text-center">
                Already in your team
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Portal - Only render on client side */}
      {isMounted && showModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-dark bg-opacity-80 backdrop-blur-sm animate-fade-in"
            onClick={closeModal}
          ></div>
          
          {/* Modal */}
          <div 
            className="bg-dark-lighter border border-dark-lightest rounded-xl overflow-hidden shadow-2xl w-full max-w-2xl z-10 animate-scale-in"
            onClick={stopPropagation}
          >
            {/* Modal Header */}
            <div className="relative p-5 border-b border-dark-lightest flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-light">{player.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-light-darker text-sm">{player.university}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full 
                    ${player.category === 'Batsman' ? 'bg-primary/20 text-primary-light' :
                      player.category === 'Bowler' ? 'bg-secondary/20 text-secondary-light' :
                      'bg-accent/20 text-accent-light'}`}
                  >
                    {player.category}
                  </span>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-dark-lightest transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light-darker" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Batting Statistics */}
                <div className="space-y-4">
                  <h4 className="text-primary font-medium border-b border-dark-lightest pb-2 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    Batting Statistics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Total Runs</span>
                      <span className="text-light font-medium">{player.total_runs}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Balls Faced</span>
                      <span className="text-light font-medium">{player.balls_faced}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Innings Played</span>
                      <span className="text-light font-medium">{player.innings_played}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Batting Strike Rate</span>
                      <span className="text-light font-medium">{formatNumber(player.battingStrikeRate)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-light-darkest">Batting Average</span>
                      <span className="text-light font-medium">{formatNumber(player.battingAverage)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bowling Statistics */}
                <div className="space-y-4">
                  <h4 className="text-secondary font-medium border-b border-dark-lightest pb-2 mb-3 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                    </svg>
                    Bowling Statistics
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Wickets</span>
                      <span className="text-light font-medium">{player.wickets}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Overs Bowled</span>
                      <span className="text-light font-medium">{player.overs_bowled}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Runs Conceded</span>
                      <span className="text-light font-medium">{player.runs_conceded}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Bowling Strike Rate</span>
                      <span className="text-light font-medium">{formatNumber(player.bowlingStrikeRate)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-dark-lightest border-dashed">
                      <span className="text-light-darkest">Bowling Average</span>
                      <span className="text-light font-medium">{formatNumber(player.bowlingAverage)}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-light-darkest">Economy Rate</span>
                      <span className="text-light font-medium">{formatNumber(player.economyRate)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Player Value */}
              <div className="mt-6 bg-dark-lightest/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-light font-medium">Player Value:</span>
                  <span className="text-accent text-xl font-bold">{formatCurrency(player.value)}</span>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            {showActions && (
              <div className="p-5 border-t border-dark-lightest" onClick={stopPropagation}>
                {!isInTeam ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleAddPlayer}
                      disabled={loading || isInTeam}
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-light disabled:bg-primary/50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-sm font-medium"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Adding...
                        </span>
                      ) : "Add to Team"}
                    </button>
                    {error && <p className="text-boundary text-xs text-center">{error}</p>}
                  </div>
                ) : (
                  <div className="w-full py-3 bg-secondary/10 border border-secondary rounded-lg text-secondary text-sm font-medium text-center">
                    Already in your team
                  </div>
                )}
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}