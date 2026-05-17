import { getRacePoster } from "../data/racePosters";

function TrackOutline({ poster }) {
  return (
    <svg
      className="race-track-svg"
      viewBox={poster.track.viewBox}
      role="img"
      aria-label={`${poster.accent} circuit outline`}
      style={{ "--track-rotation": `${poster.track.rotate || 0}deg` }}
    >
      <path className="track-shadow" d={poster.track.path} />
      <path className="track-glow" d={poster.track.path} />
      <path className="track-line" d={poster.track.path} />
    </svg>
  );
}

function CarSilhouette() {
  return (
    <svg className="race-car-svg" viewBox="0 0 440 120" role="img" aria-label="Stylized Formula car silhouette">
      <path d="M26 82 C42 64 76 58 116 56 L178 34 C210 24 254 24 286 40 L324 58 L392 62 C410 64 424 72 432 86 L424 94 L356 94 C350 108 336 116 318 116 C300 116 286 108 280 94 L140 94 C134 108 120 116 102 116 C84 116 70 108 64 94 L28 94 Z" />
      <circle cx="102" cy="94" r="20" />
      <circle cx="318" cy="94" r="20" />
      <path className="car-highlight" d="M142 58 L184 42 C214 34 250 34 276 46 L308 60 Z" />
      <path className="car-wing" d="M20 74 L78 74 L64 84 L8 84 Z" />
      <path className="car-wing" d="M356 58 L428 58 L438 68 L370 70 Z" />
    </svg>
  );
}

export default function RaceVisual({ dashboard = {} }) {
  const poster = getRacePoster(dashboard);
  const raceName = dashboard.nextRace || dashboard.raceName || poster.accent || "Race Weekend";
  const location = dashboard.city || dashboard.location || poster.location || "Grand Prix Weekend";

  return (
    <div className={`race-visual race-visual-${poster.theme} race-visual-${poster.id}`} aria-hidden="true">
      <div className="race-visual-bg" />
      <div className="race-visual-header">
        <span>{location}</span>
        <strong>{dashboard.raceDate || "Race date pending"}</strong>
      </div>
      <TrackOutline poster={poster} />
      <CarSilhouette />
      <div className="race-visual-footer">
        <span>F1 Pick 10th</span>
        <strong>{raceName}</strong>
      </div>
    </div>
  );
}
