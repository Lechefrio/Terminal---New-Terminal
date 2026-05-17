const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function fetchFromApi(endpoint, fallback = []) {
  if (!API_BASE_URL) return fallback;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`API request failed: ${endpoint}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

export function getLeaderboard() {
  return fetchFromApi("/leaderboard", []);
}

export function getPlayers() {
  return fetchFromApi("/players", []);
}

export function getRaceCalendar() {
  return fetchFromApi("/race-calendar", []);
}

export function getWeather() {
  return fetchFromApi("/weather", []);
}

export function getDrivers() {
  return fetchFromApi("/drivers", []);
}
