import { getRacePoster } from "../data/racePosters";

const cityDetails = {
  canada: { label: "Montréal city poster", landmark: "Old Montréal • Bonsecours Market", variant: "montreal" },
  monaco: { label: "Monte Carlo city poster", landmark: "Harbor • Hills • Casino lights", variant: "harbor" },
  barcelona: { label: "Barcelona city poster", landmark: "Catalan skyline • Coast", variant: "coast" },
  austria: { label: "Spielberg landscape poster", landmark: "Alpine hills • Race valley", variant: "alpine" },
  "great-britain": { label: "Silverstone heritage poster", landmark: "Village rooftops • British sky", variant: "heritage" },
  belgium: { label: "Spa forest poster", landmark: "Ardennes forest • Rolling hills", variant: "forest" },
  hungary: { label: "Budapest city poster", landmark: "Danube skyline • Parliament glow", variant: "river" },
  netherlands: { label: "Zandvoort coast poster", landmark: "Dunes • North Sea coast", variant: "dunes" },
  italy: { label: "Monza city poster", landmark: "Italian parkland • Historic arches", variant: "italy" },
  madrid: { label: "Madrid city poster", landmark: "City towers • Sunset streets", variant: "madrid" },
  azerbaijan: { label: "Baku city poster", landmark: "Old city walls • Flame towers", variant: "baku" },
  singapore: { label: "Singapore night poster", landmark: "Marina skyline • Night lights", variant: "night" },
  "united-states": { label: "Austin city poster", landmark: "Texas skyline • Hill Country", variant: "austin" },
  "mexico-city": { label: "Mexico City poster", landmark: "City skyline • Mountain air", variant: "mexico" },
  "sao-paulo": { label: "São Paulo city poster", landmark: "Urban skyline • Brazil energy", variant: "sao-paulo" },
  "las-vegas": { label: "Las Vegas poster", landmark: "The Strip • Neon lights", variant: "vegas" },
  qatar: { label: "Lusail city poster", landmark: "Desert skyline • Modern towers", variant: "desert" },
  "abu-dhabi": { label: "Yas Island poster", landmark: "Marina lights • Desert coast", variant: "desert" },
};

function SkylineBlocks() {
  return (
    <g className="city-skyline-blocks">
      <rect x="42" y="142" width="34" height="78" rx="4" />
      <rect x="82" y="118" width="44" height="102" rx="5" />
      <rect x="134" y="154" width="36" height="66" rx="4" />
      <rect x="178" y="98" width="48" height="122" rx="6" />
      <rect x="236" y="132" width="52" height="88" rx="5" />
      <rect x="300" y="86" width="42" height="134" rx="5" />
      <rect x="352" y="150" width="46" height="70" rx="5" />
      <rect x="408" y="110" width="48" height="110" rx="6" />
    </g>
  );
}

function MontrealPosterArt() {
  return (
    <>
      <path className="city-sky" d="M0 72 C68 46 132 60 194 40 C290 8 362 54 520 18 L520 226 L0 226 Z" />
      <g className="city-landmarks montreal-landmarks">
        <path d="M54 220 L54 126 L86 126 L86 220 Z" />
        <path d="M70 88 L94 126 L46 126 Z" />
        <path d="M110 220 L110 112 L148 112 L148 220 Z" />
        <path d="M129 70 L156 112 L102 112 Z" />
        <rect x="180" y="148" width="88" height="72" rx="10" />
        <path d="M190 148 C204 116 244 116 258 148 Z" />
        <rect x="292" y="134" width="62" height="86" rx="8" />
        <path d="M356 220 L394 76 L416 84 L386 220 Z" />
        <path d="M396 78 C438 92 470 126 486 164 C446 154 418 126 396 78 Z" />
      </g>
      <path className="city-bridge" d="M20 184 C96 118 176 118 258 172 C326 218 402 214 500 154" />
      <path className="city-bridge city-bridge-secondary" d="M28 204 C110 150 184 150 258 190 C336 234 416 230 506 184" />
    </>
  );
}

function HarborPosterArt() {
  return (
    <>
      <path className="city-mountain" d="M0 96 C96 38 190 64 278 38 C356 16 430 42 520 20 L520 226 L0 226 Z" />
      <SkylineBlocks />
      <g className="city-boats">
        <path d="M72 204 L146 204 L126 218 L88 218 Z" />
        <path d="M102 198 L116 166 L130 198 Z" />
        <path d="M328 206 L448 206 L420 220 L348 220 Z" />
        <path d="M382 198 L402 154 L424 198 Z" />
      </g>
    </>
  );
}

function NeonPosterArt() {
  return (
    <>
      <path className="city-road" d="M210 226 L290 226 L250 120 Z" />
      <g className="city-neon-towers">
        <rect x="52" y="112" width="48" height="108" rx="5" />
        <rect x="120" y="72" width="56" height="148" rx="6" />
        <path d="M214 220 L238 78 L262 220 Z" />
        <circle cx="250" cy="78" r="16" />
        <rect x="302" y="96" width="62" height="124" rx="7" />
        <rect x="386" y="124" width="56" height="96" rx="6" />
      </g>
    </>
  );
}

function LandscapePosterArt({ variant }) {
  return (
    <>
      <path className="city-mountain" d="M0 124 C78 76 128 104 188 72 C254 36 330 82 386 54 C438 28 476 42 520 22 L520 226 L0 226 Z" />
      <path className={`city-secondary city-secondary-${variant}`} d="M0 168 C82 130 150 152 220 126 C310 92 392 126 520 84 L520 226 L0 226 Z" />
      <SkylineBlocks />
    </>
  );
}

function CityIllustration({ variant }) {
  if (variant === "montreal") return <MontrealPosterArt />;
  if (variant === "harbor" || variant === "coast") return <HarborPosterArt />;
  if (variant === "vegas" || variant === "night") return <NeonPosterArt />;
  return <LandscapePosterArt variant={variant} />;
}

export default function RaceVisual({ dashboard = {} }) {
  const poster = getRacePoster(dashboard);
  const raceName = dashboard.nextRace || dashboard.raceName || poster.accent || "Race Weekend";
  const location = dashboard.city || dashboard.location || poster.location || "Grand Prix Weekend";
  const detail = cityDetails[poster.id] || { label: `${location} city poster`, landmark: poster.accent, variant: "city" };

  return (
    <div className={`race-visual race-visual-city race-visual-${poster.theme} race-visual-${poster.id}`} aria-label={detail.label} role="img">
      <div className="race-visual-bg" />
      <div className="city-sun" />
      <svg className="race-city-svg" viewBox="0 0 520 260" aria-hidden="true">
        <CityIllustration variant={detail.variant} />
        <path className="city-river" d="M0 220 C94 204 160 236 248 216 C338 196 420 224 520 202 L520 260 L0 260 Z" />
      </svg>
      <div className="race-visual-header">
        <span>{location}</span>
        <strong>{dashboard.raceDate || "Race date pending"}</strong>
      </div>
      <div className="race-visual-footer">
        <span>{detail.landmark}</span>
        <strong>{raceName}</strong>
      </div>
    </div>
  );
}
