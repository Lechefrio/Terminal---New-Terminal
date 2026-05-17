import { Flag, Lock, RadioTower, Users } from "lucide-react";

export default function RaceStatus({ dashboard = {}, players = [], leaderboard = [], drivers = [] }) {
  const takenDrivers = drivers.filter((driver) => String(driver.status || "").toLowerCase() === "taken" || driver.pickedBy).length;
  const pickCount = dashboard.readyPicks ?? leaderboard.filter((row) => row.pick && row.pick !== "Pending").length;

  return (
    <section className="panel race-status-panel" id="race">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Race Weekend</p>
          <h2>Status Center</h2>
        </div>
        <span className="soft-pill">{dashboard.systemStatus || "Ready"}</span>
      </div>

      <div className="status-grid">
        <div><span><RadioTower size={15} /> Backend</span><strong>{dashboard.systemStatus || "Connected"}</strong></div>
        <div><span><Lock size={15} /> Picks</span><strong>{dashboard.pickWindow || "Manual lock"}</strong></div>
        <div><span><Flag size={15} /> Scoring</span><strong>{dashboard.currentLeader || "Waiting"}</strong></div>
        <div><span><Users size={15} /> Players</span><strong>{dashboard.activePlayers || players.length}</strong></div>
        <div><span>Ready picks</span><strong>{pickCount}</strong></div>
        <div><span>Drivers taken</span><strong>{takenDrivers}</strong></div>
      </div>
    </section>
  );
}
