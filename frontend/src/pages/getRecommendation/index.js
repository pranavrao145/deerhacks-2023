import { useState, useEffect } from "react"
import styles from "./getRecommendation.module.scss";

export default function GetRecommendation() {
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h2>Recommend an outfit:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Occassion:
          <select
            onChange={(e) => setOccasion(e.target.value)}
            value={occasion}
          >
            <option value="" disabled></option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Date">Date</option>
            <option value="Running Errands">Running Errands</option>
            <option value="Cocktail Party">Cocktail Party</option>
            <option value="Funeral">Funeral</option>
          </select>
        </label>
        <label>
          Weather:
          <select onChange={(e) => setWeather(e.target.value)} value={weather}>
            <option value="" disabled></option>
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
          </select>
        </label>
        <label>
          Time of Day:
          <select
            onChange={(e) => setTimeOfDay(e.target.value)}
            value={timeOfDay}
          >
            <option value="" disabled></option>
            <option value="Day">Day</option>
            <option value="Night">Night</option>
          </select>
        </label>

        <button>Get Recommendations!</button>
      </form>
    </div>
  );
}
