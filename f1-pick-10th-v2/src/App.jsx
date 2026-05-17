import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Leaderboard from "./components/Leaderboard";
import PlayerCards from "./components/PlayerCards";
import RaceStatus from "./components/RaceStatus";
import { getLeaderboard, getPlayers } from "./services/api";

export default function App() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    async function loadDashboard() {
      const [leaderboardData, playersData] = await Promise.all([
        getLeaderboard(),
        getPlayers(),
      ]);

      setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
      setPlayers(Array.isArray(playersData) ? playersData : []);
      setStatus("Online");
    }

    loadDashboard();
  }, []);

  return (
    <main className="app-shell">
      <Header />
      <Hero status={status} />
      <section className="dashboard-grid">
        <Leaderboard rows={leaderboard} />
        <PlayerCards players={players} />
      </section>
      <RaceStatus />
    </main>
  );
}
