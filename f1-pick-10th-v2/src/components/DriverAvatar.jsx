import { useState } from "react";
import { getDriverPhoto } from "../data/driverPhotos";

function initialsFor(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function colorIndexFor(name = "") {
  return Array.from(String(name)).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 8;
}

export default function DriverAvatar({ name, size = "md", className = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = initialsFor(name);
  const colorIndex = colorIndexFor(name);
  const photo = getDriverPhoto(name);
  const showPhoto = photo && !imageFailed;

  return (
    <div
      className={`driver-avatar driver-avatar-${size} driver-avatar-color-${colorIndex} ${showPhoto ? "has-photo" : "has-initials"} ${className}`}
      aria-hidden="true"
      title={name}
    >
      {showPhoto ? (
        <img src={photo} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setImageFailed(true)} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
