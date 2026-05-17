export default function Leaderboard({ rows }) {
  const data = rows?.length ? rows : [
    { player: "Reggie", pick: "Pending", points: 0 },
    { player: "Rachel", pick: "Pending", points: 0 },
    { player: "Reece", pick: "Pending", points: 0 },
    { player: "Rooney", pick: "Pending", points: 0 },
  ];

  return (
    <section className="panel leaderboard-panel" id="leaderboard">
      <div className="panel-header">
        <p className="eyebrow">Current Standings</p>
        <h2>Leaderboard</h2>
      </div>
      <div className="leaderboard-list">
        {data.map((row, index) => (
          <article className="leaderboard-row" key={`${row.player || row.name}-${index}`}>
            <div className="rank">{index + 1}</div>
            <div className="leaderboard-name">
              <strong>{row.player || row.name || "Player"}</strong>
              <span>{row.pick ? `Pick: ${row.pick}` : "Pick pending"}</span>
            </div>
            <div className="points">{row.points ?? row.score ?? 0}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
