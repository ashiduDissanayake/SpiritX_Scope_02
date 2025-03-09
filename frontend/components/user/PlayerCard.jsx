"use client";
import { useState } from "react";
import { useTeam } from "@/context/TeamContext";

export default function PlayerCard({ player, showActions = true }) {
  const [showDetails, setShowDetails] = useState(false);
  const { team, addPlayer } = useTeam();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if player is already in team
  const isInTeam = team.players.some((p) => p.id === player.id);

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

  return (
    <div className={`relative bg-dark-lighter rounded-xl overflow-hidden border border-dark-lightest transition-all duration-300 shadow-md hover:shadow-primary/10 ${showDetails ? 'z-10' : ''}`}>
      {/* Category indicator */}
      <div className={`absolute top-0 right-0 w-0 h-0 border-t-[16px] border-r-[16px] 
        ${player.category === 'Batsman' ? 'border-t-primary/80 border-r-primary/80' : 
          player.category === 'Bowler' ? 'border-t-secondary/80 border-r-secondary/80' : 
          'border-t-accent/80 border-r-accent/80'}`}>
      </div>

      {/* Player header */}
      <div 
        onClick={() => {
          console.log("Card clicked!", player.name);
          setShowDetails(!showDetails)}}
        className="p-4 cursor-pointer flex flex-col gap-1"
      >
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
      </div>

      {/* Expandable details (absolutely positioned) */}
      {showDetails && (
        <div className="absolute top-[calc(100%-1px)] left-0 w-full bg-dark-lighter border-t border-dark-lightest p-4 rounded-b-xl shadow-lg animate-slide-up z-20">
          <div className="space-y-4">
            <div>
              <h4 className="text-primary font-medium border-b border-dark-lightest pb-1 mb-2">Batting Statistics</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Total Runs:</span>
                  <span className="text-light font-medium">{player.total_runs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Balls Faced:</span>
                  <span className="text-light font-medium">{player.balls_faced}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Innings:</span>
                  <span className="text-light font-medium">{player.innings_played}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Strike Rate:</span>
                  <span className="text-light font-medium">{formatNumber(player.battingStrikeRate)}</span>
                </div>
                <div className="flex justify-between items-center col-span-2">
                  <span className="text-light-darkest text-sm">Batting Average:</span>
                  <span className="text-light font-medium">{formatNumber(player.battingAverage)}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-secondary font-medium border-b border-dark-lightest pb-1 mb-2">Bowling Statistics</h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Wickets:</span>
                  <span className="text-light font-medium">{player.wickets}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Overs:</span>
                  <span className="text-light font-medium">{player.overs_bowled}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Runs Conceded:</span>
                  <span className="text-light font-medium">{player.runs_conceded}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Strike Rate:</span>
                  <span className="text-light font-medium">{formatNumber(player.bowlingStrikeRate)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Average:</span>
                  <span className="text-light font-medium">{formatNumber(player.bowlingAverage)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-light-darkest text-sm">Economy:</span>
                  <span className="text-light font-medium">{formatNumber(player.economyRate)}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-dark-lightest rounded-lg p-3 flex justify-between items-center">
              <span className="text-light-darker font-medium">Player Value:</span>
              <span className="text-accent font-bold">{formatCurrency(player.value)}</span>
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setShowDetails(false)}
              className="w-full mt-2 text-center text-sm text-light-darkest py-2 border-t border-dark-lightest hover:text-primary transition-colors"
            >
              Close details
            </button>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {showActions && (
        <div className="p-4 pt-0">
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
  );
}