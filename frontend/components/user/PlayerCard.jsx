"use client";

import { useState } from "react";
import { useTeam } from "@/context/TeamContext";
import styles from "./PlayerCard.module.css";

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
    <div className={styles.playerCard}>
      <div
        className={styles.playerHeader}
        onClick={() => setShowDetails(!showDetails)}
      >
        <h3>{player.name}</h3>
        <div className={styles.playerMeta}>
          <span className={styles.university}>{player.university}</span>
          <span className={styles.category}>{player.category}</span>
        </div>
      </div>

      {showDetails && (
        <div className={styles.playerDetails}>
          <h4>Batting Statistics</h4>
          <div className={styles.statsGrid}>
            <div>
              <span className={styles.statLabel}>Total Runs:</span>
              <span className={styles.statValue}>{player.total_runs}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Balls Faced:</span>
              <span className={styles.statValue}>{player.balls_faced}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Innings Played:</span>
              <span className={styles.statValue}>{player.innings_played}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Batting Strike Rate:</span>
              <span className={styles.statValue}>
                {formatNumber(player.battingStrikeRate)}
              </span>
            </div>
            <div>
              <span className={styles.statLabel}>Batting Average:</span>
              <span className={styles.statValue}>
                {formatNumber(player.battingAverage)}
              </span>
            </div>
          </div>

          <h4>Bowling Statistics</h4>
          <div className={styles.statsGrid}>
            <div>
              <span className={styles.statLabel}>Wickets:</span>
              <span className={styles.statValue}>{player.wickets}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Overs Bowled:</span>
              <span className={styles.statValue}>{player.overs_bowled}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Runs Conceded:</span>
              <span className={styles.statValue}>{player.runs_conceded}</span>
            </div>
            <div>
              <span className={styles.statLabel}>Bowling Strike Rate:</span>
              <span className={styles.statValue}>
                {formatNumber(player.bowlingStrikeRate)}
              </span>
            </div>
            <div>
              <span className={styles.statLabel}>Bowling Average:</span>
              <span className={styles.statValue}>
                {formatNumber(player.bowlingAverage)}
              </span>
              <span className={styles.statLabel}>Economy Rate:</span>
              <span className={styles.statValue}>
                {formatNumber(player.economyRate)}
              </span>
            </div>
          </div>

          <div className={styles.playerValue}>
            <h4>Player Value:</h4>
            <span>{formatCurrency(player.value)}</span>
          </div>
        </div>
      )}

      {showActions && !isInTeam && (
        <div className={styles.actions}>
          <button
            onClick={handleAddPlayer}
            disabled={loading || isInTeam}
            className={styles.addButton}
          >
            {loading ? "Adding..." : "Add to Team"}
          </button>
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
      )}

      {showActions && isInTeam && (
        <div className={styles.inTeamBadge}>Already in your team</div>
      )}
    </div>
  );
}
