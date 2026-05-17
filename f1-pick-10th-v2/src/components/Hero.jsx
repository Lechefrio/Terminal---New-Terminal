import { CalendarDays, CloudSun, Clock3, Radio, Timer, Trophy } from "lucide-react";

function raceTimeLabel(dashboard) {
  return dashboard.raceTime || dashboard.startTime || dashboard.lightsOut || dashboard.sessionTime || "Time TBD";
}

function weatherLabel(weather, dashboard) {
  const first = Array.isArray(weather) ? weather[0] : null;
  return dashboard.weatherSummary || first?.summary || first?.condition || first?.forecast || "Forecast pending";
}

export default function Hero({ status, dashboard = {}, weather = [] }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Formula 1 Fantasy Game</p>
        <h1>Pick the driver who finishes P10.</h1>
        <p className="hero-text">
          Live standings, active players, driver availability, race-weekend status,
          weather, and pick submission in one mobile-first dashboard.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#picks">Submit Pick</a>
          <a className="secondary-button" href="#leaderboard">View Standings</a>
        </div>
      </div>

      <div className="race-card">
        <div className="status-pill"><Radio size={16} /> {status}</div>
        <Trophy className="race-card-icon" size={44} />
        <p className="eyebrow race-card-eyebrow">Upcoming Race</p>
        <h2>{dashboard.nextRace || "Race Weekend"}</h2>
        <p className="race-card-date">{dashboard.raceDate || "Race date pending"}</p>
        <div className="mini-stat-grid race-detail-grid">
          <span><Clock3 size={15} /> {raceTimeLabel(dashboard)}</span>
          <span><CalendarDays size={15} /> {dashboard.pickWindow || "Pick window pending"}</span>
          <span><Timer size={15} /> {dashboard.lockRule || "Locks before lights out"}</span>
          <span><CloudSun size={15} /> {weatherLabel(weather, dashboard)}</span>
        </div>
      </div>
    </section>
  );
}
