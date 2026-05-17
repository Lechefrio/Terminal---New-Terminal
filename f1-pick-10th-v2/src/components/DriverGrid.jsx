export default function DriverGrid({ drivers = [] }) {
  const data = drivers.length ? drivers : [];

  return (
    <section className="panel full-width-panel" id="drivers">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Driver Board</p>
          <h2>Available Picks</h2>
        </div>
        <span className="soft-pill">{data.length || 0} drivers</span>
      </div>

      {data.length === 0 ? (
        <div className="empty-state">Drivers will appear when the backend sends Driver Grid data.</div>
      ) : (
        <div className="driver-grid">
          {data.map((driver, index) => {
            const taken = String(driver.status || "").toLowerCase() === "taken" || Boolean(driver.pickedBy);
            return (
              <article className={`driver-card ${taken ? "taken" : "available"}`} key={`${driver.name}-${index}`}>
                <div className="driver-number">#{driver.carNumber || "--"}</div>
                <div>
                  <strong>{driver.name}</strong>
                  <span>{driver.team || "Team TBD"}</span>
                </div>
                <em>{taken ? `Taken${driver.pickedBy ? ` by ${driver.pickedBy}` : ""}` : "Available"}</em>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
