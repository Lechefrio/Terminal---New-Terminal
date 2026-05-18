import { getRacePoster } from "../data/racePosters";

export default function RaceVisual({ dashboard = {} }) {
  const poster = getRacePoster(dashboard);
  const raceName = dashboard.nextRace || dashboard.raceName || poster.accent || "Race Weekend";
  const location = dashboard.city || dashboard.location || poster.location || "Grand Prix Weekend";

  return (
    <div className={`race-visual race-visual-track race-visual-${poster.theme} race-visual-${poster.id}`} aria-label={`${location} circuit visual`} role="img">
      <div className="race-visual-bg" />
      <svg className="race-track-svg" viewBox="0 0 520 260" aria-hidden="true">
        <path className="track-shadow" d="M52 158 C90 86 168 88 220 112 C268 134 294 92 342 78 C402 60 444 118 480 156 C416 150 376 134 326 132 C268 128 248 178 188 178 C126 178 92 142 52 158 Z" />
        <path className="track-line" d="M52 158 C90 86 168 88 220 112 C268 134 294 92 342 78 C402 60 444 118 480 156 C416 150 376 134 326 132 C268 128 248 178 188 178 C126 178 92 142 52 158 Z" />
        <path className="track-line track-line-inner" d="M82 164 C118 122 170 124 218 144 C270 166 298 120 346 110 C386 102 418 128 450 150" />
        <path className="track-start" d="M74 158 L98 144" />
        <path className="track-start track-start-two" d="M86 166 L110 152" />
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
