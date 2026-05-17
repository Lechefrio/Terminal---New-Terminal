const avatarStyle = {
  Reggie: { skin: "#d59a66", hair: "#7a4b24", shirt: "#fff7ed", accent: "#c41f1a", feature: "beard" },
  Rachel: { skin: "#f0b784", hair: "#7b5437", shirt: "#a8b6a4", accent: "#e10600", feature: "glasses" },
  Reece: { skin: "#efad73", hair: "#151515", shirt: "#20242d", accent: "#e10600", feature: "tie" },
  Rooney: { skin: "#f1bd86", hair: "#b97938", shirt: "#f4efe7", accent: "#e10600", feature: "boy" },
  Abby: { skin: "#eeb07a", hair: "#3c251c", shirt: "#87966f", accent: "#e10600", feature: "glasses" },
  Genevieve: { skin: "#f0b57b", hair: "#c48a3d", shirt: "#f8f3ef", accent: "#e10600", feature: "ponytail" },
  Josie: { skin: "#f0ad78", hair: "#9a5d27", shirt: "#79b7ad", accent: "#e10600", feature: "freckles" },
};

function initialsFor(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function svgFor(name, config) {
  const initials = initialsFor(name);
  const glasses = config.feature === "glasses";
  const beard = config.feature === "beard";
  const freckles = config.feature === "freckles" || config.feature === "ponytail";
  const tie = config.feature === "tie";
  const boy = config.feature === "boy";
  const ponytail = config.feature === "ponytail";

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <defs>
      <radialGradient id="bg" cx="50%" cy="42%" r="62%">
        <stop offset="0%" stop-color="#fffaf0"/>
        <stop offset="100%" stop-color="#efe1cf"/>
      </radialGradient>
      <linearGradient id="red" x1="18" x2="110" y1="10" y2="118">
        <stop stop-color="#ff2a22"/>
        <stop offset="58%" stop-color="#e10600"/>
        <stop offset="100%" stop-color="#8c0200"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".32"/>
      </filter>
    </defs>
    <circle cx="64" cy="64" r="62" fill="url(#red)"/>
    <circle cx="64" cy="64" r="53" fill="#11151d"/>
    <path d="M9 48h15v7H9zm0 14h15v7H9zm95-14h15v7h-15zm0 14h15v7h-15z" fill="#fff" opacity=".96"/>
    <path d="M18 37h10v8H18zm82 0h10v8h-10z" fill="#e10600"/>
    <circle cx="64" cy="64" r="45" fill="url(#bg)"/>
    ${ponytail ? `<ellipse cx="45" cy="65" rx="17" ry="28" fill="${config.hair}" opacity=".88"/>` : ""}
    ${boy ? `<path d="M39 41c5-15 43-20 53 2 4 9 1 18-3 25H38c-5-10-5-18 1-27z" fill="${config.hair}"/>` : `<path d="M34 58c-3-22 12-38 31-38 22 0 34 16 31 39-6-12-16-20-31-20-16 0-25 8-31 19z" fill="${config.hair}"/>`}
    <path d="M35 102c4-19 19-29 29-29s25 10 29 29c-8 8-18 13-29 13s-21-5-29-13z" fill="${config.shirt}" filter="url(#shadow)"/>
    ${tie ? `<path d="M60 82h8l5 24-9 8-9-8z" fill="#101216" opacity=".9"/>` : ""}
    <ellipse cx="64" cy="59" rx="28" ry="31" fill="${config.skin}"/>
    <path d="M42 47c5-12 16-18 29-18 14 0 23 8 27 20-9-8-18-13-33-13-13 0-18 4-23 11z" fill="${config.hair}"/>
    ${beard ? `<path d="M43 67c5 24 36 25 43 0 0 20-8 32-22 32S43 87 43 67z" fill="#3a261c" opacity=".92"/>` : ""}
    <circle cx="53" cy="60" r="5.6" fill="#2b160d"/>
    <circle cx="75" cy="60" r="5.6" fill="#2b160d"/>
    <circle cx="55" cy="58" r="1.9" fill="#fff"/>
    <circle cx="77" cy="58" r="1.9" fill="#fff"/>
    <path d="M49 49c5-4 11-4 16-1M72 48c5-3 11-2 16 2" fill="none" stroke="#442516" stroke-width="3" stroke-linecap="round" opacity=".78"/>
    ${glasses ? `<g fill="none" stroke="#3c2417" stroke-width="3"><circle cx="53" cy="61" r="10"/><circle cx="75" cy="61" r="10"/><path d="M63 61h3"/></g>` : ""}
    ${freckles ? `<g fill="#bd6f48" opacity=".55"><circle cx="46" cy="66" r="1.1"/><circle cx="51" cy="70" r="1"/><circle cx="57" cy="67" r=".9"/><circle cx="75" cy="68" r="1"/><circle cx="81" cy="65" r=".9"/><circle cx="84" cy="70" r="1"/></g>` : ""}
    <path d="M57 76c5 5 13 5 18 0" fill="none" stroke="#7a241e" stroke-width="3" stroke-linecap="round"/>
    <path d="M59 77c4 2 10 2 14 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>
    <circle cx="64" cy="64" r="61" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/>
    <circle cx="64" cy="64" r="53" fill="none" stroke="#000" stroke-width="2" opacity=".35"/>
  </svg>`;
}

function toDataUri(svg) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}`;
}

export const playerAvatars = Object.fromEntries(
  Object.entries(avatarStyle).map(([name, config]) => [name, toDataUri(svgFor(name, config))])
);

export function getPlayerAvatar(name = "") {
  return playerAvatars[String(name).trim()] || "";
}
