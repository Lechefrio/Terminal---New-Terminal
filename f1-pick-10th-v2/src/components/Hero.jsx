import { CalendarDays, CloudSun, Clock3, Radio, Timer, Trophy } from "lucide-react";
import RaceVisual from "./RaceVisual";

function raceTimeLabel(dashboard) {
  const rawTime = dashboard.raceTime || dashboard.startTime || dashboard.lightsOut || dashboard.sessionTime || "";
  if (!rawTime) return "Time TBD";

  const timeText = String(rawTime).trim();
  const hasPacific = /\b(PST|PDT|PT|Pacific)\b/i.test(timeText);
  const hasEastern = /\b(ET|EST|EDT|Eastern)\b/i.test(timeText);
  if (hasEastern && hasPacific) return timeText;

  const timeMatch = timeText.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
  if (!hasEastern || !timeMatch) return timeText;

  let hour = Number(timeMatch[1]);
  const minutes = timeMatch[2] || "00";
  const meridiem = timeMatch[3].toUpperCase();

  if (meridiem === "PM" && hour !== 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;

  const pacificHour24 = (hour + 21) % 24;
  const pacificMeridiem = pacificHour24 >= 12 ? "PM" : "AM";
  const pacificHour12 = pacificHour24 % 12 || 12;
  const pacificTime = `${pacificHour12}:${minutes} ${pacificMeridiem}`;

  const easternDisplay = /\b(ET|EST|EDT|Eastern)\b/i.test(timeText)
    ? timeText
    : `${timeText} ET`;

  return `${easternDisplay} / ${pacificTime} PST`;
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

      <div className="race-card race-card-poster">
        <div className="status-pill"><Radio size={16} /> {status}</div>
        <RaceVisual dashboard={dashboard} />
        <div className="race-card-content">
          <Trophy className="race-card-icon" size={34} />
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
      </div>
    </section>
  );
}
