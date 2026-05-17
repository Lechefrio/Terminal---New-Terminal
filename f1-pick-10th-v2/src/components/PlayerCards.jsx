export default function PlayerCards({ players }) {
  const data = players?.length ? players : [
    { name: "Reggie", status: "Active" },
    { name: "Rachel", status: "Active" },
    { name: "Reece", status: "Active" },
    { name: "Rooney", status: "Active" },
  ];

  return (
    <section className="panel" id="players">
      <div className="panel-header">
        <p className="eyebrow">Family Grid</p>
        <h2>Players</h2>
      </div>
      <div className="player-grid">
        {data.map((player, index) => (
          <article className="player-card" key={`${player.name || player.player}-${index}`}>
            <div className="helmet-dot" />
            <strong>{player.name || player.player || "Player"}</strong>
            <span>{player.status || "Active"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
