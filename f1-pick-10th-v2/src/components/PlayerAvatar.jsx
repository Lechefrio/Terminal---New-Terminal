import { getPlayerAvatar } from "../data/playerAvatars";

function initialsFor(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function PlayerAvatar({ name, size = "md", className = "" }) {
  const src = getPlayerAvatar(name);

  return (
    <span className={`player-avatar player-avatar-${size} ${className}`} aria-hidden="true" title={name}>
      {src ? <img src={src} alt="" loading="lazy" /> : <span>{initialsFor(name)}</span>}
    </span>
  );
}
