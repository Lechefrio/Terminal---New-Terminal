// Final approved player avatars only.
// Source photos are not used anywhere in the app.
// Files live in /public/player-avatars and are served directly by Netlify.

export const playerAvatars = {
  Reggie: "/player-avatars/reggie.svg?v=final-avatar-v1",
  Rachel: "/player-avatars/rachel.svg?v=final-avatar-v2",
  Reece: "/player-avatars/reece.svg?v=final-avatar-v1",
  Rooney: "/player-avatars/rooney.svg?v=final-avatar-v1",
  Tyler: "/player-avatars/tyler.svg?v=final-avatar-v1",
  Abby: "/player-avatars/abby.svg?v=final-avatar-v1",
  Genevieve: "/player-avatars/genevieve.svg?v=final-avatar-v1",
  Josie: "/player-avatars/josie.svg?v=final-avatar-v1",
};

export function getPlayerAvatar(name = "") {
  const key = String(name || "").trim();
  return playerAvatars[key] || "";
}
