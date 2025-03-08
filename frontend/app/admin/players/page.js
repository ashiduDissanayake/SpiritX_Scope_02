"use client";
import { useState, useEffect } from "react";
import { playerService } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import Link from "next/link";
import PlayerForm from "@/components/admin/PlayerForm";
import styles from "./page.module.css";

export default function PlayersManagementPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); // New state for category
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [showRestrictedMessage, setShowRestrictedMessage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!user?.isAdmin) {
        setShowRestrictedMessage(true);
        const timer = setTimeout(() => {
          setShowRestrictedMessage(false);
          router.push("/login");
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      const socket = io("http://localhost:3001");
      loadPlayers();
  
      socket.on("playerCreated", (newPlayer) => setPlayers((prev) => [...prev, newPlayer]));
      socket.on("playerUpdated", (updatedPlayer) =>
        setPlayers((prev) =>
          prev.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p))
        )
      );
      socket.on("playerDeleted", (deletedPlayer) =>
        setPlayers((prev) => prev.filter((p) => p.id !== deletedPlayer.id))
      );
  
      return () => socket.disconnect();
    }
  }, [isAuthenticated, user]);


  const loadPlayers = async () => {
    try {
      setLoading(true);
      const data = await playerService.getAllPlayers();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.isAdmin) {
      loadPlayers();
    } else {
      setShowRestrictedMessage(true);
      const timer = setTimeout(() => {
        setShowRestrictedMessage(false);
        router.push("/players");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user]);

  const handleDeletePlayer = async (id) => {
    if (window.confirm("Are you sure you want to delete this player?")) {
      try {
        await playerService.deletePlayer(id);
        loadPlayers(); // Reload the list
      } catch (error) {
        console.error("Error deleting player:", error);
        alert("Failed to delete player");
      }
    }
  };

  // Filter players by search term and category
  const filteredPlayers = players.filter((player) => {
    const categoryMatch =
      selectedCategory === "All" || player.category === selectedCategory;
    const searchMatch =
      player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.university.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  if (authLoading || !isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (showRestrictedMessage) {
    return (
      <div className={styles.restrictedMessage}>
        This is a restricted page. Redirecting in 2 seconds...
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className={styles.restrictedMessage}>
        This is a restricted page. Redirecting to login in 2 seconds...
      </div>
    );
  }

  return (
    <div className={styles.playersManagement}>
      <div className={styles.header}>
        <h1>Players Management</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Hide Form" : "Add New Player"}
        </button>
      </div>

      {showAddForm && (
        <div className={styles.formContainer}>
          <PlayerForm
            onSuccess={() => {
              loadPlayers();
              setShowAddForm(false);
            }}
          />
        </div>
      )}

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
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

      {loading ? (
        <div className={styles.loading}>Loading players...</div>
      ) : (
        <div className={styles.playersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.nameColumn}>Name</div>
            <div className={styles.universityColumn}>University</div>
            <div className={styles.categoryColumn}>Category</div>
            <div className={styles.statsColumn}>Stats</div>
            <div className={styles.actionsColumn}>Actions</div>
          </div>

          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div key={player.id} className={styles.tableRow}>
                <div className={styles.nameColumn}>{player.name}</div>
                <div className={styles.universityColumn}>
                  {player.university}
                </div>
                <div className={styles.categoryColumn}>{player.category}</div>
                <div className={styles.statsColumn}>
                  Runs: {player.total_runs}, Wickets: {player.wickets}
                </div>
                <div className={styles.actionsColumn}>
                  <Link
                    href={`/admin/players/${player.id}`}
                    className={styles.editButton}
                  >
                    Stats
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeletePlayer(player.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noPlayers}>
              No players found matching your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}