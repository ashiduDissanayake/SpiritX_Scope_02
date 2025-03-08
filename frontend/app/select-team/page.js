"use client";
import { useState, useEffect } from "react";
import { playerService } from "@/lib/api";
import PlayerCard from "@/components/user/PlayerCard";
import BudgetTracker from "@/components/user/BudgetTracker";
import TeamCompletenessIndicator from "@/components/user/TeamCompletenessIndicator";
import Spiriter from "@/components/chatbot/Spiriter";
import { useAuth } from "@/context/AuthContext";
import { useTeam } from "@/context/TeamContext";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import styles from "./page.module.css";

export default function SelectTeamPage() {
  const [players, setPlayers] = useState([]);
  const [showRestrictedMessage, setShowRestrictedMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { team } = useTeam();
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
    });

    socket.on("playerCreated", (newPlayer) => {
      console.log("Player created:", newPlayer);
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    });

    socket.on("playerDeleted", (deletedPlayer) => {
      console.log("Player deleted:", deletedPlayer);
      setPlayers((prevPlayers) =>
        prevPlayers.filter((player) => player.id !== deletedPlayer.id)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  const filteredPlayers = players.filter((player) => {
    const categoryMatch =
      selectedCategory === "All" || player.category === selectedCategory;
    const searchMatch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.university.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (showRestrictedMessage) {
    return (
      <div className={styles.restrictedMessage}>
        This is a restricted page. Redirecting to login in 2 seconds...
      </div>
    );
  }

  if (authLoading || (loading && isAuthenticated)) {
    return <div className={styles.loading}>Loading players...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.selectTeamPage}>
      <h1>Select Your Team</h1>

      <div className={styles.teamManagement}>
        <div className={styles.statsContainer}>
          <BudgetTracker />
          <TeamCompletenessIndicator />
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput} // Added for consistent styling
            />
          </div>

          <div className={styles.categoryFilter}>
            <button
              className={selectedCategory === "All" ? styles.activeFilter : ""}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </button>
            <button
              className={
                selectedCategory === "Batsman" ? styles.activeFilter : ""
              }
              onClick={() => setSelectedCategory("Batsman")}
            >
              Batsmen
            </button>
            <button
              className={
                selectedCategory === "Bowler" ? styles.activeFilter : ""
              }
              onClick={() => setSelectedCategory("Bowler")}
            >
              Bowlers
            </button>
            <button
              className={
                selectedCategory === "All-Rounder" ? styles.activeFilter : ""
              }
              onClick={() => setSelectedCategory("All-Rounder")}
            >
              All-Rounders
            </button>
          </div>
        </div>

        <div className={styles.playersList}>
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))
          ) : (
            <div className={styles.noPlayers}>
              No players found matching your filters.
            </div>
          )}
        </div>
      </div>

      <Spiriter />
    </div>
  );
}