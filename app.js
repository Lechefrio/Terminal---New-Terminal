const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const fallbackData = {
  players: [
    { name: "Reggie", status: "Active" },
    { name: "Rachel", status: "Active" },
    { name: "Reece", status: "Active" },
    { name: "Rooney", status: "Active" },
    { name: "Tyler", status: "Active" },
    { name: "Abby", status: "Active" },
    { name: "Abbigail", status: "Active" },
    { name: "Josie", status: "Active" },
  ],
  leaderboard: [],
  drivers: [],
  dashboard: {},
  weather: [],
  raceCalendar: [],
};

let cachedDataPromise = null;

function jsonp(action, params = {}) {
  return new Promise((resolve, reject) => {
    if (!API_BASE_URL) {
      reject(new Error("VITE_API_BASE_URL is not configured."));
      return;
    }

    const callbackName = `pick10th_${Date.now()}_${Math.round(Math.random() * 100000)}`;
    const url = new URL(API_BASE_URL);

    url.searchParams.set("action", action);
    url.searchParams.set("callback", callbackName);

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, value);
      }
    });

    const script = document.createElement("script");

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (payload) => {
      cleanup();

      if (payload && payload.ok === false) {
        reject(new Error(payload.error || "Apps Script API error."));
        return;
      }

      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Could not reach Apps Script API."));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

async function getAllData() {
  if (!cachedDataPromise) {
    cachedDataPromise = jsonp("getData")
      .then((payload) => payload?.data || fallbackData)
      .catch((error) => {
        console.warn(error.message);
        return fallbackData;
      });
  }

  return cachedDataPromise;
}

function normalizePlayers(players) {
  if (!Array.isArray(players)) return fallbackData.players;

  return players.map((player) => {
    if (typeof player === "string") {
      return {
        name: player,
        status: "Active",
      };
    }

    return {
      name: player.name || player.player || "Player",
      status: player.status || "Active",
      ...player,
    };
  });
}

export async function getLeaderboard() {
  const data = await getAllData();
  return Array.isArray(data.leaderboard) ? data.leaderboard : [];
}

export async function getPlayers() {
  const data = await getAllData();
  return normalizePlayers(data.players);
}

export async function getRaceCalendar() {
  const data = await getAllData();
  return data.raceCalendar || data.calendar || [];
}

export async function getWeather() {
  const data = await getAllData();
  return data.weather || [];
}

export async function getDrivers() {
  const data = await getAllData();
  return data.drivers || [];
}

export async function getDashboard() {
  const data = await getAllData();
  return data.dashboard || {};
}
