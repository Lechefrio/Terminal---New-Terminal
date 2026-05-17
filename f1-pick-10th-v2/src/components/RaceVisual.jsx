function getRaceTone(raceName = "") {
  const normalized = String(raceName).toLowerCase();
  if (normalized.includes("canada") || normalized.includes("canadian")) return "canada";
  if (normalized.includes("monaco")) return "monaco";
  if (normalized.includes("spain") || normalized.includes("barcelona")) return "spain";
  return "default";
}

function TrackOutline({ tone }) {
  const paths = {
    // Simplified silhouettes cross-checked against public circuit maps. These are not official artwork;
    // they are lightweight app graphics designed to resemble the real layouts at small card size.
    canada: "M260 62 C230 66 202 72 174 82 C144 94 118 110 92 126 L56 148 C42 156 30 168 34 180 C38 194 58 194 74 184 L118 158 C146 142 170 132 200 126 L244 118 C270 112 292 100 298 82 C304 64 286 58 260 62 Z M76 184 C100 204 136 212 170 200 C204 188 222 158 244 118",
    monaco: "M42 174 C58 152 80 140 104 128 C126 116 142 96 156 78 C170 60 194 54 210 68 C226 82 210 106 190 114 C170 122 166 142 184 152 C204 164 232 154 254 140 C278 124 302 134 304 156 C306 178 282 188 256 184 C224 180 204 198 176 206 C136 216 112 192 86 184 C66 178 52 188 42 174 Z",
    spain: "M44 164 C48 126 78 98 116 94 C154 90 178 110 196 132 C212 152 236 148 256 132 C274 118 302 126 306 150 C310 176 282 194 254 192 C224 190 214 168 190 170 C160 174 146 204 108 204 C72 204 40 192 44 164 Z M116 94 C132 118 130 146 108 166 C92 180 98 200 124 202",
    default: "M42 160 C58 126 90 104 128 100 C166 96 186 120 208 138 C232 158 262 142 288 154 C306 162 308 188 288 200 C260 216 230 198 204 188 C174 176 154 204 116 204 C80 204 36 192 42 160 Z",
  };

  return (
    <svg className="race-track-svg" viewBox="0 0 340 260" role="img" aria-label="Simplified race track outline">
      <path className="track-shadow" d={paths[tone]} />
      <path className="track-glow" d={paths[tone]} />
      <path className="track-line" d={paths[tone]} />
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
  const raceName = dashboard.nextRace || "Race Weekend";
  const venue = dashboard.venue || dashboard.location || dashboard.city || "Grand Prix Weekend";
  const tone = getRaceTone(raceName);

  return (
    <div className={`race-visual race-visual-${tone}`} aria-hidden="true">
      <div className="race-visual-bg" />
      <div className="race-visual-header">
        <span>{venue}</span>
        <strong>{dashboard.raceDate || "Race date pending"}</strong>
      </div>
      <TrackOutline tone={tone} />
      <CarSilhouette />
      <div className="race-visual-footer">
        <span>F1 Pick 10th</span>
        <strong>{raceName}</strong>
      </div>
    </div>
  );
}
