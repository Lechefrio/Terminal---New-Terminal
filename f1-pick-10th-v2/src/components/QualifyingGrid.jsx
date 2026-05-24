function lastNameFor(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "TBD";
}

function valueFrom(row = {}, keys = []) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") return row[key];
  }
  return "";
}

function normalizeIntelRows(raceIntel = {}) {
  const source = raceIntel.startingGrid || raceIntel.qualifying || raceIntel.grid || [];
  if (!Array.isArray(source)) return [];

  return source
    .map((row, index) => {
      const driver = valueFrom(row, ["driver", "name", "driverName", "fullName", "broadcastName"]);
      return {
        grid: valueFrom(row, ["grid", "gridPosition", "startPosition", "position"]) || index + 1,
        driver,
        team: valueFrom(row, ["team", "teamName", "constructor"]),
        carNumber: valueFrom(row, ["carNumber", "driverNumber", "number"]),
        q3: valueFrom(row, ["q3", "q3Time", "qualifyingTime", "time"]),
        notes: valueFrom(row, ["notes", "status", "penalty"]),
      };
    })
    .filter((row) => row.driver || row.carNumber);
}

export default function QualifyingGrid({ raceIntel = {}, drivers = [], dashboard = {} }) {
  const intelRows = normalizeIntelRows(raceIntel);
  const fallbackRows = drivers.map((driver, index) => ({
    grid: index + 1,
    driver: driver.name,
    team: driver.team,
    carNumber: driver.carNumber,
    q3: "—",
    notes: "Grid pending",
  }));

  const rows = intelRows.length ? intelRows : fallbackRows;
  const hasIntel = intelRows.length > 0;

  return (
    <section className="panel full-width-panel grid-intel-panel" id="grid-intel">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Grid Intel</p>
          <h2>Qualifying & Starting Grid</h2>
          <p className="panel-subtitle">
            {dashboard?.nextRace || "Current race"} order with Q3 times for quick Pick 10th scouting.
          </p>
        </div>
        <span className={`soft-pill ${hasIntel ? "live-pill" : "pending-pill"}`}>
          {hasIntel ? "Live grid" : "Awaiting grid data"}
        </span>
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">Starting grid and qualifying times will appear once the backend sends grid data.</div>
      ) : (
        <div className="grid-intel-list" role="table" aria-label="Qualifying and starting grid">
          <div className="grid-intel-row grid-intel-heading" role="row">
            <span>Grid</span>
            <span>Driver</span>
            <span>Team</span>
            <span>Q3</span>
          </div>

          {rows.map((row, index) => (
            <div className="grid-intel-row" role="row" key={`${row.driver || row.carNumber}-${index}`}>
              <strong className="grid-position">P{row.grid || index + 1}</strong>
              <div className="grid-driver-name">
                <strong>{lastNameFor(row.driver)}</strong>
                {row.carNumber && <small>#{row.carNumber}</small>}
              </div>
              <span>{row.team || "Team TBD"}</span>
              <em>{row.q3 || "—"}</em>
            </div>
          ))}
        </div>
      )}

      {!hasIntel && rows.length > 0 && (
        <p className="grid-intel-note">
          Showing the current driver list until qualifying/grid data is connected from the backend.
        </p>
      )}
    </section>
  );
}
