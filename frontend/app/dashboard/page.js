"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTeam } from "@/context/TeamContext";
import { useRouter } from "next/navigation";
import PlayerCard from "@/components/user/PlayerCard";
import Link from "next/link";
import io from "socket.io-client";
import Spiriter from "@/components/chatbot/Spiriter";
import styles from "./page.module.css";

export default function DashboardPage() {
  const [showRestrictedMessage, setShowRestrictedMessage] = useState(false);
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const { team, loading: teamLoading, loadTeam, isComplete } = useTeam();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      setShowRestrictedMessage(true);
      const timer = setTimeout(() => {
        setShowRestrictedMessage(false);
        router.push("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (user) {
      if (user.isAdmin) {
        router.push("/admin");
      } else {
        loadTeam(); // Initial team load for non-admins
      }
    }

    // Connect to WebSocket server
    const socket = io("http://localhost:3001", {
      cors: {
        origin: "http://localhost:3000",
      },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server from Dashboard");
    });

    socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    // Listen for team updates
    socket.on("teamUpdated", (updatedTeam) => {
      console.log("Team updated:", updatedTeam);
      loadTeam(); // Reload team data when an update is received
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, user, loadTeam, router]);

  if (authLoading || (teamLoading && isAuthenticated)) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (showRestrictedMessage) {
    return (
      <div className={styles.restrictedMessage}>
        This is a restricted page. Redirecting to login in 2 seconds...
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className={styles.dashboardPage}>
      <h1>Welcome, {user.username}!</h1>

      <div className={styles.dashboardContent}>
        {/* Team Overview */}
        <section className={styles.teamOverview}>
          <h2>Your Team</h2>
          {team.players?.length > 0 ? (
            <div className={styles.teamStats}>
              <div className={styles.teamSummary}>
                <p>Players: {team.totalPlayers} / 11</p>
                <p>Remaining Budget: ${team.remainingBudget.toLocaleString()}</p>
                <p>Total Points: {team.totalPoints || 0}</p>
              </div>
              <div className={styles.playerList}>
                {team.players.map((player) => (
                  <PlayerCard key={player.id} player={player} showActions={false} />
                ))}
              </div>
              <Link href="/select-team" className={styles.editTeamButton}>
                Edit Team
              </Link>
            </div>
          ) : (
            <div className={styles.noTeam}>
              <p>You haven’t selected any players yet.</p>
              <Link href="/select-team" className={styles.startTeamButton}>
                Start Building Your Team
              </Link>
            </div>
          )}
        </section>

        {/* Quick Stats */}
        <section className={styles.quickStats}>
          <h2>Quick Stats</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Players</span>
              <span className={styles.statValue}>{team.totalPlayers || 0}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Budget Spent</span>
              <span className={styles.statValue}>
                ${team.budgetSpent.toLocaleString()}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Remaining Budget</span>
              <span className={styles.statValue}>
                ${team.remainingBudget.toLocaleString()}
              </span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total Points</span>
              <span className={styles.statValue}>{team.totalPoints || 0}</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className={styles.quickLinks}>
          <h2>Quick Links</h2>
          <div className={styles.linksGrid}>
            <Link href="/select-team" className={styles.linkButton}>
              Select Team
            </Link>
            <Link href="/my-team" className={styles.linkButton}>
              View Team Details
            </Link>
            <Link href="/players" className={styles.linkButton}>
              Browse Players
            </Link>
            <Link href="/leaderboard" className={styles.linkButton}>
              Leaderboard
            </Link>
          </div>
        </section>
      </div>
      <Spiriter />
    </div>
  );
}