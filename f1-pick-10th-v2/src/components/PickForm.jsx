import { Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

export default function PickForm({ players = [], drivers = [], dashboard = {}, onSubmitPick }) {
  const [player, setPlayer] = useState("");
  const [driver, setDriver] = useState("");
  const [message, setMessage] = useState("Select a player and an available driver.");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickLocked = String(dashboard.pickWindow || "").toLowerCase() === "locked";

  const availableDrivers = useMemo(() => drivers.filter((item) => {
    const status = String(item.status || "").toLowerCase();
    return status !== "taken" && !item.pickedBy;
  }), [drivers]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (pickLocked) {
      setMessage("Picks are locked for this race weekend.");
      return;
    }

    if (!player || !driver) {
      setMessage("Choose both a player and driver before submitting.");
      return;
    }

    setIsSubmitting(true);
    setMessage("Submitting pick...");

    try {
      const payload = await onSubmitPick({ player, driver });
      setMessage(payload?.message || "Pick submitted. Refreshing live data...");
      setPlayer("");
      setDriver("");
    } catch (error) {
      setMessage(error.message || "Pick could not be submitted.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="panel" id="picks">
      <div className="panel-header">
        <p className="eyebrow">Submit Pick</p>
        <h2>Pick Center</h2>
      </div>

      <form className="pick-form" onSubmit={handleSubmit}>
        <label>
          <span>Player</span>
          <select value={player} onChange={(event) => setPlayer(event.target.value)}>
            <option value="">Choose player</option>
            {players.map((item, index) => (
              <option value={item.name || item.player} key={`${item.name || item.player}-${index}`}>
                {item.name || item.player}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Driver</span>
          <select value={driver} onChange={(event) => setDriver(event.target.value)} disabled={pickLocked}>
            <option value="">Choose driver</option>
            {availableDrivers.map((item, index) => (
              <option value={item.name} key={`${item.name}-${index}`}>
                {item.name} — {item.team || "Team TBD"}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button form-button" type="submit" disabled={isSubmitting || pickLocked}>
          <Send size={16} /> {pickLocked ? "Picks Locked" : isSubmitting ? "Submitting" : "Submit Pick"}
        </button>
      </form>

      <div className={`pick-message ${pickLocked ? "locked" : ""}`}>
        <ShieldCheck size={16} /> {message}
      </div>
    </section>
  );
}
