/***** PICK 10TH WEB API — Google Apps Script *****/
/***** Paste this into Apps Script attached to your Google Sheet. *****/

const PICK10TH_TOKEN = 'change-this-private-league-token';

function doGet(e) {
  const params = e.parameter || {};
  const action = params.action || 'getData';
  let result;

  try {
    if (action === 'getData') result = getPublicData_();
    else if (action === 'submitPick') result = submitPick_(params);
    else result = { ok: false, error: 'Unknown action: ' + action };
  } catch (err) {
    result = { ok: false, error: err.message || String(err) };
  }

  return jsonp_(params.callback, result);
}

function getPublicData_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const playersSheet = ss.getSheetByName('Players');
  const leaderboardSheet = ss.getSheetByName('Leaderboard');
  const driverGridSheet = ss.getSheetByName('Driver Grid');
  const raceCalendarSheet = ss.getSheetByName('Race Calendar');
  const raceControlSheet = ss.getSheetByName('Race Control');
  const weatherSheet = ss.getSheetByName('Weather Forecast');

  const players = playersSheet.getRange('A2:B').getValues()
    .filter(r => r[0] && String(r[1]).toLowerCase() === 'active')
    .map(r => String(r[0]));

  const raceControl = safeValues_(raceControlSheet, 'A1:B12');
  const currentRaceId = valueFromRows_(raceControl, 'Current Race ID') || safeCell_(raceControlSheet, 'B3');
  const lockState = safeCell_(raceControlSheet, 'B8') || 'OPEN';

  const upcoming = findUpcomingRace_(raceCalendarSheet);
  const weather = readWeather_(weatherSheet);
  const weatherSummary = weather[0]
    ? [weather[0].summary, weather[0].temperature, weather[0].precipitation].filter(Boolean).join(' · ')
    : safeCell_(weatherSheet, 'B2') || 'No forecast loaded yet';

  const leaderboard = readLeaderboard_(leaderboardSheet);
  const drivers = readDrivers_(driverGridSheet);
  const readyPicks = countReadyPicks_();

  const leader = leaderboard[0] || {};

  return {
    ok: true,
    data: {
      dashboard: {
        nextRace: upcoming.name || currentRaceId || 'TBD',
        raceDate: upcoming.date || 'Race date TBD',
        raceTime: upcoming.time || 'Time TBD',
        startTime: upcoming.time || 'Time TBD',
        venue: upcoming.location || upcoming.venue || '',
        city: upcoming.city || '',
        country: upcoming.country || '',
        pickWindow: String(lockState).toUpperCase() === 'LOCKED' ? 'LOCKED' : 'OPEN',
        lockRule: '10 min before lights out',
        currentLeader: leader.player || 'TBD',
        leaderPoints: leader.points || 0,
        activePlayers: players.length,
        readyPicks: readyPicks,
        weatherSummary: weatherSummary,
        sprintWeekend: upcoming.sprint || 'TBD',
        systemStatus: 'Live backend ready'
      },
      players: players,
      leaderboard: leaderboard,
      drivers: drivers,
      weather: weather,
      raceCalendar: upcoming ? [upcoming] : []
    }
  };
}

function submitPick_(params) {
  if (!params.token || params.token !== PICK10TH_TOKEN) {
    return { ok: false, error: 'Invalid or missing league token.' };
  }

  const player = String(params.player || '').trim();
  const driver = String(params.driver || '').trim();
  if (!player || !driver) return { ok: false, error: 'Player and driver are required.' };

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picksSheet = ss.getSheetByName('Picks');
  const raceControlSheet = ss.getSheetByName('Race Control');
  const driverGridSheet = ss.getSheetByName('Driver Grid');

  const raceId = safeCell_(raceControlSheet, 'B3');
  const lockState = safeCell_(raceControlSheet, 'B8');
  if (String(lockState).toUpperCase() === 'LOCKED') {
    return { ok: false, error: 'Picks are locked for this race.' };
  }

  const validPlayers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Players').getRange('A2:B').getValues()
    .filter(r => r[0] && String(r[1]).toLowerCase() === 'active')
    .map(r => String(r[0]));
  if (!validPlayers.includes(player)) return { ok: false, error: 'Unknown or inactive player.' };

  const drivers = readDrivers_(driverGridSheet);
  const selectedDriver = drivers.find(d => d.name === driver);
  if (!selectedDriver) return { ok: false, error: 'Unknown driver.' };
  if (selectedDriver.status === 'Taken') return { ok: false, error: 'That driver is already taken.' };

  picksSheet.appendRow([raceId, player, driver, selectedDriver.carNumber || '', 'Submitted', new Date()]);

  return { ok: true, message: player + ' picked ' + driver + '.' };
}

function readLeaderboard_(sheet) {
  const raw = sheet.getRange('A1:G30').getDisplayValues();
  const rows = raw.slice(1).filter(r => r[0]);
  const leaderboard = rows.map((r, i) => ({
    rank: i + 1,
    player: r[0],
    carNumber: r[1],
    pick: r[2],
    raceId: r[3],
    finish: r[4],
    points: Number(r[5]) || 0,
    exactP10: r[6],
    status: Number(r[5]) > 0 ? 'Scored' : 'Pending'
  }));
  leaderboard.sort((a, b) => (b.points || 0) - (a.points || 0));
  leaderboard.forEach((row, index) => row.rank = index + 1);
  return leaderboard;
}

function readDrivers_(sheet) {
  const raw = sheet.getRange('A3:I30').getDisplayValues();
  return raw.filter(r => r[1]).map(r => ({
    carNumber: r[0],
    name: r[1],
    code: r[2],
    team: r[3],
    country: r[4],
    raceId: r[5],
    status: r[6] || 'Available',
    pickedBy: r[7],
    risk: r[8]
  }));
}

function findUpcomingRace_(sheet) {
  const rows = sheet.getRange('A1:M200').getDisplayValues();
  const headers = rows[0].map(h => String(h).trim());

  const roundIndex = headerIndex_(headers, ['Round'], 0);
  const shortRaceIndex = headerIndex_(headers, ['Race'], 1);
  const officialNameIndex = headerIndex_(headers, ['Official Event Name', 'Event Name', 'Race Name', 'Grand Prix'], 2);
  const circuitIndex = headerIndex_(headers, ['Circuit'], 3);
  const cityIndex = headerIndex_(headers, ['City'], 4);
  const countryIndex = headerIndex_(headers, ['Country'], 5);
  const weekendStartIndex = headerIndex_(headers, ['Weekend Start'], 6);
  const raceDateIndex = headerIndex_(headers, ['Race Date'], 7);
  const statusIndex = headerIndex_(headers, ['Status'], 8);
  const sprintIndex = headerIndex_(headers, ['Sprint Weekend', 'Sprint'], 9);
  const timeIndex = headerIndex_(headers, ['Official Race Local/TBD', 'Race Time', 'Start Time', 'Lights Out', 'Lights Out Time', 'Session Time'], 10);

  const dataRows = rows.slice(1).filter(r => r.some(Boolean));
  const nextRace = dataRows.find(r => String(r[statusIndex]).toLowerCase() === 'next race');
  const upcomingRace = dataRows.find(r => String(r[statusIndex]).toLowerCase() === 'upcoming');
  const match = nextRace || upcomingRace;
  if (!match) return {};

  return {
    round: match[roundIndex],
    race: match[shortRaceIndex],
    name: match[officialNameIndex] || match[roundIndex] || match[shortRaceIndex],
    officialName: match[officialNameIndex],
    location: match[circuitIndex],
    venue: match[circuitIndex],
    circuit: match[circuitIndex],
    city: match[cityIndex],
    country: match[countryIndex],
    weekendStart: match[weekendStartIndex],
    date: match[raceDateIndex],
    time: timeIndex >= 0 ? match[timeIndex] : '',
    status: match[statusIndex],
    sprint: match[sprintIndex]
  };
}

function readWeather_(sheet) {
  if (!sheet) return [];
  const rows = sheet.getRange('A1:H20').getDisplayValues();
  if (!rows.length) return [];
  const headers = rows[0].map(h => String(h).trim());
  const dayIndex = headerIndex_(headers, ['Day', 'Session', 'Date'], 0);
  const dateIndex = headerIndex_(headers, ['Date', 'Local Date'], 1);
  const tempIndex = headerIndex_(headers, ['Temp', 'Temperature', 'High', 'High/Low'], 2);
  const precipIndex = headerIndex_(headers, ['Precip', 'Precipitation', 'Rain', 'Rain Chance'], 3);
  const windIndex = headerIndex_(headers, ['Wind', 'Wind Speed'], 4);
  const summaryIndex = headerIndex_(headers, ['Summary', 'Forecast', 'Condition', 'Weather'], 5);

  return rows.slice(1).filter(r => r.some(Boolean)).map((r, index) => ({
    day: r[dayIndex] || r[dateIndex] || 'Forecast ' + (index + 1),
    date: r[dateIndex] || '',
    temperature: r[tempIndex] || '',
    temp: r[tempIndex] || '',
    precipitation: r[precipIndex] || '',
    precip: r[precipIndex] || '',
    wind: r[windIndex] || '',
    summary: r[summaryIndex] || ''
  }));
}

function countReadyPicks_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const form = ss.getSheetByName('Mobile Pick Form');
  if (!form) return 0;
  return form.getRange('E8:E15').getDisplayValues().flat().filter(v => v === 'Ready').length;
}

function headerIndex_(headers, names, fallback) {
  for (var i = 0; i < names.length; i++) {
    var idx = headers.indexOf(names[i]);
    if (idx >= 0) return idx;
  }
  return fallback;
}

function safeCell_(sheet, a1) {
  try { return sheet.getRange(a1).getDisplayValue(); } catch (e) { return ''; }
}

function safeValues_(sheet, a1) {
  try { return sheet.getRange(a1).getDisplayValues(); } catch (e) { return []; }
}

function valueFromRows_(rows, label) {
  const row = rows.find(r => String(r[0]).trim() === label);
  return row ? row[1] : '';
}

function jsonp_(callback, payload) {
  const json = JSON.stringify(payload);
  if (callback) {
    return ContentService
      .createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}