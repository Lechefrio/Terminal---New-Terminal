import { CheckCircle2, Send, ShieldAlert, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PlayerAvatar from "./PlayerAvatar";

export default function PickForm({ players = [], drivers = [], dashboard = {}, leaderboard = [], onSubmitPick }) {
  const [player, setPlayer] = useState("");
  const [driver, setDriver] = useState("");
  const [message, setMessage] = useState("Select a player and an available driver.");
  const [messageType, setMessageType] = useState("neutral");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const pickLocked = String(dashboard.pickWindow || "").toLowerCase() === "locked";

  const playerPickMap = useMemo(() => {
    const map = new Map();
    leaderboard.forEach((row) => {
      const name = row.player || row.name;
      const pick = row.pick || row.driver;
      if (name && pick && pick !== "Pending") map.set(name, pick);
    });
    return map;
  }, [leaderboard]);

  const selectedPlayerPick = playerPickMap.get(player);

  const availableDrivers = useMemo(() => drivers.filter((item) => {
    const status = String(item.status || "").toLowerCase();
    return status !== "taken" && !item.pickedBy;
  }), [drivers]);

  useEffect(() => {
    if (!player) return;
    if (selectedPlayerPick) {
      setDriver("");
      setMessage(`${player} already has ${selectedPlayerPick}. Refresh or contact the admin to change it.`);
      setMessageType("warning");
    } else {
      setMessage("Choose an available driver and submit once.");
      setMessageType("neutral");
    }
  }, [player, selectedPlayerPick]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (pickLocked) {
      setMessage("Picks are locked for this race weekend.");
      setMessageType("warning");
      return;
    }

    if (selectedPlayerPick) {
      setMessage(`${player} already submitted ${selectedPlayerPick}. Duplicate picks are blocked.`);
      setMessageType("warning");
      return;
    }

    if (!player || !driver) {
      setMessage("Choose both a player and driver before submitting.");
      setMessageType("warning");
      return;
    }

    setIsSubmitting(true);
    setJustSubmitted(false);
    setMessage("Submitting pick to the live spreadsheet...");
    setMessageType("neutral");

    try {
      const payload = await onSubmitPick({ player, driver });
      setMessage(payload?.message || "Pick submitted and live data refreshed.");
      setMessageType("success");
      setJustSubmitted(true);
      setPlayer("");
      setDriver("");
      window.setTimeout(() => setJustSubmitted(false), 4200);
    } catch (error) {
      setMessage(error.message || "Pick could not be submitted.");
      setMessageType("warning");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`panel pick-panel ${justSubmitted ? "pick-success-flash" : ""}`} id="picks">
      <div className="panel-header split-header">
        <div>
          <p className="eyebrow">Submit Pick</p>
          <h2>Pick Center</h2>
        </div>
        <span className={`soft-pill ${pickLocked ? "danger-pill" : "good-pill"}`}>
          {pickLocked ? "Locked" : "Open"}
        </span>
      </div>

      {justSubmitted && (
        <div className="success-banner">
          <CheckCircle2 size={20} /> Pick confirmed. Driver board refreshed.
        </div>
      )}

      {player && (
        <div className="pick-selected-player">
          <PlayerAvatar name={player} size="sm" />
          <div>
            <strong>{player}</strong>
            <span>{selectedPlayerPick ? `Already picked ${selectedPlayerPick}` : "Ready to pick"}</span>
          </div>
        </div>
      )}

      <form className="pick-form" onSubmit={handleSubmit}>
        <label>
          <span>Player</span>
          <select value={player} onChange={(event) => setPlayer(event.target.value)}>
            <option value="">Choose player</option>
            {players.map((item, index) => {
              const name = item.name || item.player;
              const existingPick = playerPickMap.get(name);
              return (
                <option value={name} key={`${name}-${index}`}>
                  {name}{existingPick ? ` — picked ${existingPick}` : ""}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          <span>Driver</span>
          <select value={driver} onChange={(event) => setDriver(event.target.value)} disabled={pickLocked || Boolean(selectedPlayerPick)}>
            <option value="">Choose driver</option>
            {availableDrivers.map((item, index) => (
              <option value={item.name} key={`${item.name}-${index}`}>
                {item.name} — {item.team || "Team TBD"}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button form-button" type="submit" disabled={isSubmitting || pickLocked || Boolean(selectedPlayerPick)}>
          <Send size={16} /> {pickLocked ? "Picks Locked" : isSubmitting ? "Submitting" : "Submit Pick"}
        </button>
      </form>

      <div className={`pick-message ${messageType}`}>
        {messageType === "warning" ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />} {message}
      </div>
    </section>
  );
}
