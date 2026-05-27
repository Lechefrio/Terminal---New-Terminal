import { getRacePoster } from "../data/racePosters";

export default function RaceVisual({ dashboard = {} }) {
  const poster = getRacePoster(dashboard);
  const raceName = dashboard.nextRace || dashboard.raceName || poster.accent || "Race Weekend";
  const location = dashboard.city || dashboard.location || poster.location || "Grand Prix Weekend";
  const track = poster.track || {};
  const trackPath = track.path || "M54 206 C68 182 72 146 92 126 C118 100 152 112 178 118 C210 126 258 118 294 96 C318 82 346 52 358 72 C372 96 330 102 328 128 C326 158 366 150 364 176 C362 204 318 214 286 206 C248 196 226 214 190 224 C148 236 110 218 92 192 C80 176 64 218 54 206 Z";

  return (
    <div className={`race-visual race-visual-track race-visual-${poster.theme} race-visual-${poster.id}`} aria-label={`${location} circuit visual`} role="img">
      <div className="race-visual-bg" />
      <svg className="race-track-svg" viewBox={track.viewBox || "0 0 420 280"} aria-hidden="true">
        <path className="track-shadow" d={trackPath} />
        <path className="track-line" d={trackPath} />
      </svg>
      <div className="race-visual-header">
        <span>{location}</span>
        <strong>{dashboard.raceDate || "Race date pending"}</strong>
      </div>
      <div className="race-visual-footer">
        <span>F1 Pick 10th</span>
        <strong>{raceName}</strong>
      </div>
    </div>
  );
}
