const fallbackPlayers = [
  { name: "Reggie", status: "Active" },
  { name: "Rachel", status: "Active" },
  { name: "Reece", status: "Active" },
  { name: "Rooney", status: "Active" },
  { name: "Tyler", status: "Active" },
  { name: "Abby", status: "Active" },
  { name: "Abbigail", status: "Active" },
  { name: "Josie", status: "Active" },
];

export default function PlayerCards({ players = [], leaderboard = [] }) {
  const data = players.length ? players : fallbackPlayers;

  function getPlayerPick(playerName) {
    const row = leaderboard.find((item) => (item.player || item.name) === playerName);
    return row?.pick || row?.driver || "Pick pending";
  }

  return (
    <section className="panel" id="players">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Family Grid</p>
          <h2>Players</h2>
        </div>
        <span className="soft-pill">{data.length} active</span>
      </div>

      <div className="player-grid">
        {data.map((player, index) => {
          const name = player.name || player.player || "Player";
          return (
            <article className="player-card" key={`${name}-${index}`}>
              <div className="helmet-dot" />
              <strong>{name}</strong>
              <span>{getPlayerPick(name)}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
