import PlayerAvatar from "./PlayerAvatar";

const fallbackRows = [
  { player: "Reggie", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Rachel", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Reece", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Rooney", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Tyler", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Abby", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Genevieve", pick: "Pending", points: 0, status: "Waiting" },
  { player: "Josie", pick: "Pending", points: 0, status: "Waiting" },
];

function playerName(row) {
  return row.player || row.name || "Player";
}

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
        {data.slice(0, 3).map((row, index) => {
          const name = playerName(row);
          return (
            <article className={`podium-card podium-${index + 1}`} key={`${name}-podium-${index}`}>
              <small>P{index + 1}</small>
              <PlayerAvatar name={name} size="lg" />
              <strong>{name}</strong>
              <span>{row.points ?? row.score ?? 0} pts</span>
            </article>
          );
        })}
      </div>

      <div className="leaderboard-list">
        {data.map((row, index) => {
          const name = playerName(row);
          return (
            <article className="leaderboard-row" key={`${name}-${index}`}>
              <div className="rank">{row.rank || index + 1}</div>
              <PlayerAvatar name={name} size="sm" />
              <div className="leaderboard-name">
                <strong>{name}</strong>
                <span>{row.pick ? `Pick: ${row.pick}` : "Pick pending"}</span>
              </div>
              <div className="leaderboard-meta">
                <div className="points">{row.points ?? row.score ?? 0}</div>
                <small>{row.status || "Pending"}</small>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
