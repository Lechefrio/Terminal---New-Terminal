import { Trophy, Radio, Timer } from "lucide-react";

export default function Hero({ status }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Formula 1 Fantasy Game</p>
        <h1>Pick the driver who finishes P10.</h1>
        <p className="hero-text">
          A cleaner, faster, mobile-first race weekend dashboard for picks,
          players, leaderboard movement, and live backend data.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#leaderboard">View Standings</a>
          <a className="secondary-button" href="#players">View Players</a>
        </div>
      </div>

      <div className="race-card">
        <div className="status-pill"><Radio size={16} /> {status}</div>
        <Trophy className="race-card-icon" size={44} />
        <h2>Live System</h2>
        <p>Frontend shell ready for your existing spreadsheet-powered backend.</p>
        <div className="mini-stat-grid">
          <span><strong>P10</strong> target</span>
          <span><Timer size={15} /> lock timer ready</span>
        </div>
      </div>
    </section>
  );
}
