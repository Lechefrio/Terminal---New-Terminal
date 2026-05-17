const fallbackData = {
  dashboard: {
    nextRace: "TBD",
    raceDate: "TBD",
    pickWindow: "Setup Needed",
    lockRule: "10 min before lights out",
    currentLeader: "TBD",
    leaderPoints: 0,
    activePlayers: 8,
    readyPicks: 0,
    weatherSummary: "No forecast loaded yet",
    sprintWeekend: "TBD",
    systemStatus: "Demo mode"
  },
  players: ["Reggie", "Rachel", "Reece", "Rooney", "Tyler", "Abby", "Abbigail", "Josie"],
  leaderboard: [],
  drivers: []
};

const state = {
  data: fallbackData,
  apiUrl: window.PICK10TH_API_URL || "",
  token: window.PICK10TH_API_TOKEN || ""
};

const $ = (id) => document.getElementById(id);

function showNotice(message, type = "success") {
  const el = $("connection");
  el.textContent = message;
  el.className = `notice ${type}`;
  window.setTimeout(() => el.classList.add("hidden"), 6000);
}

function jsonp(action, params = {}) {
  return new Promise((resolve, reject) => {
    if (!state.apiUrl || state.apiUrl.includes("PASTE_APPS_SCRIPT")) {
      reject(new Error("API URL not configured. Running in demo mode."));
      return;
    }

    const callbackName = `pick10th_${Date.now()}_${Math.round(Math.random() * 100000)}`;
    const url = new URL(state.apiUrl);
    url.searchParams.set("action", action);
    url.searchParams.set("callback", callbackName);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) url.searchParams.set(key, value);
    });

    const script = document.createElement("script");
    const cleanup = () => {
      delete window[callbackName];
      script.remove();
    };

    window[callbackName] = (payload) => {
      cleanup();
      if (payload && payload.ok === false) reject(new Error(payload.error || "API error"));
      else resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Could not reach Apps Script API."));
    };

    script.src = url.toString();
    document.body.appendChild(script);
  });
}

async function loadData() {
  try {
    const payload = await jsonp("getData");
    state.data = payload.data || fallbackData;
    renderAll();
    showNotice("Live data loaded from Google Sheets.");
  } catch (error) {
    console.warn(error);
    state.data = fallbackData;
    renderAll();
    showNotice(error.message, "error");
  }
}

function renderDashboard() {
  const d = state.data.dashboard || fallbackData.dashboard;
  $("nextRace").textContent = d.nextRace || "TBD";
  $("raceDate").textContent = d.raceDate || "Race date TBD";
  $("pickWindow").textContent = d.pickWindow || "TBD";
  $("lockRule").textContent = d.lockRule || "Locks before lights out";
  $("currentLeader").textContent = d.currentLeader || "TBD";
  $("leaderPoints").textContent = `${d.leaderPoints || 0} points`;
  $("activePlayers").textContent = d.activePlayers || 0;
  $("readyPicks").textContent = `${d.readyPicks || 0} picks ready`;
  $("weatherSummary").textContent = d.weatherSummary || "TBD";
  $("sprintWeekend").textContent = d.sprintWeekend || "TBD";
  $("systemStatus").textContent = d.systemStatus || "Ready";
}

function renderLeaderboard() {
  const leaderboard = state.data.leaderboard || [];
  const body = $("leaderboardBody");
  const podium = $("podium");

  if (!leaderboard.length) {
    body.innerHTML = `<tr><td colspan="6">No scored results yet.</td></tr>`;
    podium.innerHTML = [1,2,3].map(place => `
      <article class="podium-card"><small>P${place}</small><strong>TBD</strong><small>Waiting for results</small></article>
    `).join("");
    return;
  }

  podium.innerHTML = leaderboard.slice(0, 3).map((row, index) => `
    <article class="podium-card">
      <small>P${index + 1}</small>
      <strong>${escapeHtml(row.player || "TBD")}</strong>
      <small>${escapeHtml(row.points ?? 0)} points</small>
    </article>
  `).join("");

  body.innerHTML = leaderboard.map((row, index) => `
    <tr>
      <td>${row.rank || index + 1}</td>
      <td>${escapeHtml(row.player || "")}</td>
      <td>${escapeHtml(row.pick || "")}</td>
      <td>${escapeHtml(row.carNumber || "")}</td>
      <td>${escapeHtml(row.points ?? 0)}</td>
      <td>${escapeHtml(row.status || "Pending")}</td>
    </tr>
  `).join("");
}

function renderPickForm() {
  const players = state.data.players || fallbackData.players;
  const drivers = state.data.drivers || [];

  $("playerSelect").innerHTML = `<option value="">Choose player</option>` + players.map(player =>
    `<option value="${escapeAttr(player)}">${escapeHtml(player)}</option>`
  ).join("");

  $("driverSelect").innerHTML = `<option value="">Choose driver</option>` + drivers.map(driver => {
    const disabled = driver.status === "Taken" ? "disabled" : "";
    const label = `${driver.name} — ${driver.team || ""}${driver.status === "Taken" ? " (Taken)" : ""}`;
    return `<option value="${escapeAttr(driver.name)}" ${disabled}>${escapeHtml(label)}</option>`;
  }).join("");
}

function renderDrivers() {
  const drivers = state.data.drivers || [];
  const grid = $("driverGrid");

  if (!drivers.length) {
    grid.innerHTML = `<div class="loading-card">Drivers will appear after the API is connected.</div>`;
    return;
  }

  grid.innerHTML = drivers.map(driver => {
    const taken = driver.status === "Taken";
    return `
      <article class="driver-card ${taken ? "taken" : ""}">
        <h3>${escapeHtml(driver.name || "")}</h3>
        <div class="meta">#${escapeHtml(driver.carNumber || "")} · ${escapeHtml(driver.team || "")}</div>
        <span class="badge ${taken ? "taken" : "available"}">${escapeHtml(driver.status || "Available")}</span>
        ${driver.pickedBy ? `<div class="meta">Picked by ${escapeHtml(driver.pickedBy)}</div>` : ""}
      </article>
    `;
  }).join("");
}

function renderAll() {
  renderDashboard();
  renderLeaderboard();
  renderPickForm();
  renderDrivers();
  updatePickStatus();
}

function updatePickStatus() {
  const player = $("playerSelect").value;
  const driverName = $("driverSelect").value;
  const driver = (state.data.drivers || []).find(d => d.name === driverName);
  const status = $("pickStatus");

  status.className = "pick-status";
  if (!player || !driverName) {
    status.textContent = "Select a player and driver.";
    return;
  }
  if ((state.data.dashboard || {}).pickWindow === "LOCKED") {
    status.textContent = "Picks are locked for this race.";
    status.classList.add("locked");
    return;
  }
  if (driver && driver.status === "Taken") {
    status.textContent = "That driver is already taken.";
    status.classList.add("blocked");
    return;
  }
  status.textContent = "Pick is ready to submit.";
  status.classList.add("ready");
}

async function submitPick(event) {
  event.preventDefault();
  const player = $("playerSelect").value;
  const driver = $("driverSelect").value;
  if (!player || !driver) return;

  try {
    const payload = await jsonp("submitPick", { player, driver, token: state.token });
    showNotice(payload.message || "Pick submitted.");
    await loadData();
  } catch (error) {
    showNotice(error.message, "error");
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);
}

function escapeAttr(value) { return escapeHtml(value); }

$("refreshButton").addEventListener("click", loadData);
$("pickForm").addEventListener("submit", submitPick);
$("playerSelect").addEventListener("change", updatePickStatus);
$("driverSelect").addEventListener("change", updatePickStatus);

loadData();
