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
  const initials = initialsFor(name);
  const colorIndex = colorIndexFor(name);

  return (
    <div
      className={`driver-avatar driver-avatar-${size} driver-avatar-color-${colorIndex} ${className}`}
      aria-hidden="true"
      title={name}
    >
      <span>{initials}</span>
    </div>
  );
}
