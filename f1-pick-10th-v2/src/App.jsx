import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Leaderboard from "./components/Leaderboard";
import PlayerCards from "./components/PlayerCards";
import RaceStatus from "./components/RaceStatus";
import DriverGrid from "./components/DriverGrid";
import WeatherPanel from "./components/WeatherPanel";
import PickForm from "./components/PickForm";
import { getAllData, submitPick } from "./services/api";

export default function App() {
  const [dashboardData, setDashboardData] = useState({
    dashboard: {},
    leaderboard: [],
    players: [],
    drivers: [],
    weather: [],
    raceCalendar: [],
  });
  const [status, setStatus] = useState("Loading");
  const [lastUpdated, setLastUpdated] = useState("");

  async function loadDashboard({ forceRefresh = false } = {}) {
    setStatus(forceRefresh ? "Refreshing" : "Loading");
    const data = await getAllData({ forceRefresh });
    setDashboardData(data);
    setStatus("Online");
    setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function handleSubmitPick(pick) {
    const payload = await submitPick(pick);
    await loadDashboard({ forceRefresh: true });
    return payload;
  }

  const { dashboard, leaderboard, players, drivers, weather } = dashboardData;

  return (
    <main className="app-shell">
      <Header status={status} lastUpdated={lastUpdated} onRefresh={() => loadDashboard({ forceRefresh: true })} />
      <Hero status={status} dashboard={dashboard} weather={weather} />

      <section className="dashboard-grid">
        <Leaderboard rows={leaderboard} />
        <PlayerCards players={players} leaderboard={leaderboard} />
      </section>

      <section className="dashboard-grid secondary-grid">
        <RaceStatus dashboard={dashboard} players={players} leaderboard={leaderboard} drivers={drivers} />
        <WeatherPanel weather={weather} dashboard={dashboard} />
      </section>

      <section className="dashboard-grid secondary-grid">
        <PickForm players={players} drivers={drivers} dashboard={dashboard} leaderboard={leaderboard} onSubmitPick={handleSubmitPick} />
        <DriverGrid drivers={drivers} />
      </section>
    </main>
  );
}
