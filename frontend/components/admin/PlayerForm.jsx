"use client";
import { useState, useEffect } from "react";
import { playerService } from "@/lib/api";
import styles from "./PlayerForm.module.css"; // Assume a CSS module for styling

const PlayerForm = ({ playerId, onSuccess, initialPlayer = {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    category: "",
    total_runs: "",
    balls_faced: "",
    innings_played: "",
    wickets: "",
    overs_bowled: "",
    runs_conceded: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load initial player data if editing
  useEffect(() => {
    if (playerId) {
      const fetchPlayer = async () => {
        try {
          const data = await playerService.getPlayerById(playerId);
          setFormData({
            name: data.name || "",
            university: data.university || "",
            category: data.category || "",
            total_runs: data.total_runs?.toString() || "",
            balls_faced: data.balls_faced?.toString() || "",
            innings_played: data.innings_played?.toString() || "",
            wickets: data.wickets?.toString() || "",
            overs_bowled: data.overs_bowled?.toString() || "",
            runs_conceded: data.runs_conceded?.toString() || "",
          });
        } catch (err) {
          setError("Failed to load player data");
        }
      };
      fetchPlayer();
    }
  }, [playerId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for numeric fields, and allow empty string
    const numericFields = [
      "total_runs",
      "balls_faced",
      "innings_played",
      "wickets",
      "overs_bowled",
      "runs_conceded",
    ];
    if (numericFields.includes(name)) {
      if (value === "" || /^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToSubmit = {
        ...formData,
        total_runs: formData.total_runs === "" ? 0 : parseInt(formData.total_runs, 10),
        balls_faced: formData.balls_faced === "" ? 0 : parseInt(formData.balls_faced, 10),
        innings_played: formData.innings_played === "" ? 0 : parseInt(formData.innings_played, 10),
        wickets: formData.wickets === "" ? 0 : parseInt(formData.wickets, 10),
        overs_bowled: formData.overs_bowled === "" ? 0 : parseInt(formData.overs_bowled, 10),
        runs_conceded: formData.runs_conceded === "" ? 0 : parseInt(formData.runs_conceded, 10),
      };

      if (playerId) {
        await playerService.updatePlayer(playerId, dataToSubmit);
      } else {
        await playerService.createPlayer(dataToSubmit);
      }
      onSuccess();
    } catch (err) {
      setError("Failed to save player data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.playerForm} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>University</label>
        <input
          type="text"
          name="university"
          value={formData.university}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label>Total Runs</label>
        <input
          type="text" // Use text to allow empty string
          name="total_runs"
          value={formData.total_runs}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Balls Faced</label>
        <input
          type="text"
          name="balls_faced"
          value={formData.balls_faced}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Innings Played</label>
        <input
          type="text"
          name="innings_played"
          value={formData.innings_played}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Wickets</label>
        <input
          type="text"
          name="wickets"
          value={formData.wickets}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Overs Bowled</label>
        <input
          type="text"
          name="overs_bowled"
          value={formData.overs_bowled}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Runs Conceded</label>
        <input
          type="text"
          name="runs_conceded"
          value={formData.runs_conceded}
          onChange={handleChange}
        />
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" className={styles.submitButton} disabled={loading}>
        {loading ? "Saving..." : "Save Player"}
      </button>
    </form>
  );
};

export default PlayerForm;