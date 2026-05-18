import { getRacePoster } from "../data/racePosters";

const racePhotos = {
  canada: "https://arloskye.com/cdn/shop/articles/montreal-final.jpg?v=1690321361&width=1200",
};

export default function RaceVisual({ dashboard = {} }) {
  const poster = getRacePoster(dashboard);
  const raceName = dashboard.nextRace || dashboard.raceName || poster.accent || "Race Weekend";
  const location = dashboard.city || dashboard.location || poster.location || "Grand Prix Weekend";
  const racePhoto = racePhotos[poster.id];

  return (
    <div
      className={`race-visual race-visual-photo race-visual-${poster.theme} race-visual-${poster.id}`}
      aria-label={`${location} race visual`}
      role="img"
      style={{ backgroundImage: `url(${racePhoto || "/race-photos/canada.svg?v=1"})` }}
    >
      <div className="race-visual-bg" />
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
