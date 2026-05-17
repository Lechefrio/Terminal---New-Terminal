import { useState } from "react";
import { getDriverPhoto } from "../data/driverPhotos";

function initialsFor(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function DriverAvatar({ name, size = "md", className = "" }) {
  const [failed, setFailed] = useState(false);
  const photo = getDriverPhoto(name);
  const showPhoto = photo && !failed;

  return (
    <div className={`driver-avatar driver-avatar-${size} ${className}`} aria-hidden="true">
      {showPhoto ? (
        <img src={photo} alt="" loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <span>{initialsFor(name)}</span>
      )}
    </div>
  );
}
