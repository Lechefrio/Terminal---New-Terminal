import { RefreshCw, Wifi } from "lucide-react";

export default function Header({ status = "Loading", lastUpdated = "", onRefresh }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <div className="brand-mark">10</div>
        <div>
          <strong>F1 Pick 10th</strong>
          <span>Fantasy race weekend command center</span>
        </div>
      </div>

      <nav className="header-nav" aria-label="Primary navigation">
        <a href="#leaderboard">Leaderboard</a>
        <a href="#players">Players</a>
        <a href="#picks">Picks</a>
        <a href="#drivers">Drivers</a>
        <a href="#weather">Weather</a>
      </nav>

      <div className="header-status">
        <span><Wifi size={15} /> {status}</span>
        {lastUpdated && <small>Updated {lastUpdated}</small>}
        <button type="button" onClick={onRefresh} aria-label="Refresh live data">
          <RefreshCw size={16} />
        </button>
      </div>
    </header>
  );
}
