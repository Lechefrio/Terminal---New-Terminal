const fallbackRows = [
  { player: "Reggie", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Rachel", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Reece", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Rooney", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Tyler", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Abby", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Abbigail", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Josie", pick: "Pending", points: 0, status: "Waiting" },
];

export default function Leaderboard({ rows = [] }) {
  const data = rows.length ? rows : fallbackRows;

  return (
    <section className="panel leaderboard-panel" id="leaderboard">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Current Standings</p>
          <h2>Leaderboard</h2>
        </div>
        <span className="soft-pill">{data.length} players</span>
      </div>

      <div className="podium-strip">
        {data.slice(0, 3).map((row, index) => (
          <article className={`podium-card podium-${index + 1}`} key={`${row.player || row.name}-podium-${index}`}>
            <small>P{index + 1}</small>
            <strong>{row.player || row.name || "Player"}</strong>
            <span>{row.points ?? row.score ?? 0} pts</span>
          </article>
        ))}
      </div>

      <div className="leaderboard-list">
        {data.map((row, index) => (
          <article className="leaderboard-row" key={`${row.player || row.name}-${index}`}>
            <div className="rank">{row.rank || index + 1}</div>
            <div className="leaderboard-name">
              <strong>{row.player || row.name || "Player"}</strong>
              <span>{row.pick ? `Pick: ${row.pick}` : "Pick pending"}</span>
            </div>
            <div className="leaderboard-meta">
              <div className="points">{row.points ?? row.score ?? 0}</div>
              <small>{row.status || "Pending"}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
