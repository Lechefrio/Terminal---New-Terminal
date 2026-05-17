export default function Header() {
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
        <a href="#race">Race</a>
      </nav>
    </header>
  );
}
