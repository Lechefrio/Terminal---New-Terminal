function getRaceTone(raceName = "") {
  const normalized = String(raceName).toLowerCase();
  if (normalized.includes("canada") || normalized.includes("canadian")) return "canada";
  if (normalized.includes("monaco")) return "monaco";
  if (normalized.includes("spain") || normalized.includes("barcelona")) return "spain";
  return "default";
}

function TrackOutline({ tone }) {
  const paths = {
    canada: "M32 130 C58 96 98 112 122 76 C146 40 188 53 198 92 C208 132 247 124 264 160 C276 186 246 206 216 190 C174 168 130 174 94 204 C68 226 38 204 48 172 C54 154 22 152 32 130Z",
    monaco: "M38 164 C72 134 58 94 104 80 C154 64 172 108 206 100 C238 92 254 50 284 70 C316 92 286 144 252 144 C218 144 224 192 182 202 C128 216 98 164 66 188 C44 204 22 182 38 164Z",
    spain: "M36 152 C62 92 118 96 150 126 C184 158 206 110 248 118 C294 128 302 184 258 200 C214 216 200 178 170 188 C130 202 86 220 58 196 C44 184 28 174 36 152Z",
    default: "M32 134 C66 96 106 112 132 78 C158 44 204 54 212 96 C220 136 260 128 276 164 C288 190 256 212 222 194 C178 170 136 178 98 206 C70 226 38 204 50 172 C56 152 18 154 32 134Z",
  };

  return (
    <svg className="race-track-svg" viewBox="0 0 320 260" role="img" aria-label="Stylized race track outline">
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
