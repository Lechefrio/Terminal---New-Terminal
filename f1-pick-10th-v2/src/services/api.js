const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const API_TOKEN = import.meta.env.VITE_PICK10TH_API_TOKEN || "change-this-private-league-token";
const API_TIMEOUT_MS = 45000;

const fallbackData = {
  dashboard: {
    nextRace: "TBD",
    raceDate: "Race date TBD",
    pickWindow: "Setup Needed",
    lockRule: "10 min before lights out",
    currentLeader: "TBD",
    leaderPoints: 0,
    activePlayers: 8,
    readyPicks: 0,
    weatherSummary: "No forecast loaded yet",
    sprintWeekend: "TBD",
    systemStatus: "Demo mode",
  },
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
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });

    const script = document.createElement("script");

    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Apps Script API timed out. The pick may still have been submitted; refresh live data before trying again."));
    }, API_TIMEOUT_MS);

    window[callbackName] = (payload) => {
      window.clearTimeout(timeout);
      cleanup();

      if (payload && payload.ok === false) {
        reject(new Error(payload.error || "Apps Script API error."));
        return;
      }

      resolve(payload);
    };

    script.onerror = () => {
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("Could not reach Apps Script API."));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

function normalizePlayers(players) {
  if (!Array.isArray(players) || players.length === 0) return fallbackData.players;

  return players.map((player) => {
    if (typeof player === "string") {
      return { name: player, status: "Active" };
    }

    return {
      name: player.name || player.player || "Player",
      status: player.status || "Active",
      ...player,
    };
  });
}

function looksLikeCarNumber(value) {
  return /^\d{1,3}$/.test(String(value || "").trim());
}

function normalizeLeaderboard(rows) {
  if (!Array.isArray(rows)) return [];

  return rows.map((row, index) => {
    let pick = row.pick || row.driver || "Pending";
    let carNumber = row.carNumber || row.number || row.car || "";

    if (!looksLikeCarNumber(carNumber) && looksLikeCarNumber(pick)) {
      const originalPick = pick;
      pick = carNumber || "Pending";
      carNumber = originalPick;
    }

    return {
      rank: row.rank || index + 1,
      player: row.player || row.name || "Player",
      pick,
      carNumber,
      points: Number(row.points ?? row.score ?? 0),
      status: row.status || "Pending",
      ...row,
      pick,
      carNumber,
    };
  });
}

function normalizeDrivers(drivers) {
  if (!Array.isArray(drivers)) return [];

  return drivers.map((driver) => ({
    name: driver.name || driver.fullName || driver.driver || "Driver",
    team: driver.team || driver.teamName || "TBD",
    carNumber: driver.carNumber || driver.number || driver.driverNumber || "",
    status: driver.status || (driver.pickedBy ? "Taken" : "Available"),
    pickedBy: driver.pickedBy || driver.player || "",
    ...driver,
  }));
}

function normalizeWeather(weather) {
  if (Array.isArray(weather)) return weather;
  if (weather && typeof weather === "object") return [weather];
  return [];
}

function normalizeData(rawData = {}) {
  return {
    dashboard: { ...fallbackData.dashboard, ...(rawData.dashboard || {}) },
    players: normalizePlayers(rawData.players),
    leaderboard: normalizeLeaderboard(rawData.leaderboard),
    drivers: normalizeDrivers(rawData.drivers),
    weather: normalizeWeather(rawData.weather),
    raceCalendar: rawData.raceCalendar || rawData.calendar || [],
  };
}

export async function getAllData({ forceRefresh = false } = {}) {
  if (forceRefresh) cachedDataPromise = null;

  if (!cachedDataPromise) {
    cachedDataPromise = jsonp("getData")
      .then((payload) => normalizeData(payload?.data || fallbackData))
      .catch((error) => {
        console.warn(error.message);
        return normalizeData(fallbackData);
      });
  }

  return cachedDataPromise;
}

export async function getLeaderboard() {
  const data = await getAllData();
  return data.leaderboard;
}

export async function getPlayers() {
  const data = await getAllData();
  return data.players;
}

export async function getRaceCalendar() {
  const data = await getAllData();
  return data.raceCalendar;
}

export async function getWeather() {
  const data = await getAllData();
  return data.weather;
}

export async function getDrivers() {
  const data = await getAllData();
  return data.drivers;
}

export async function getDashboard() {
  const data = await getAllData();
  return data.dashboard;
}

export async function submitPick({ player, driver }) {
  const payload = await jsonp("submitPick", {
    player,
    driver,
    token: API_TOKEN,
  });

  cachedDataPromise = null;
  return payload;
}
