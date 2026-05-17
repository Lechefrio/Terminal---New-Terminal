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
  let weather = readWeather_(weatherSheet);
  if (isPlaceholderWeather_(weather)) {
    weather = fetchRaceWeekendWeather_(upcoming) || weather;
  }

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
  const leaderboardSheet = ss.getSheetByName('Leaderboard');
  const raceControlSheet = ss.getSheetByName('Race Control');
  const driverGridSheet = ss.getSheetByName('Driver Grid');

  const raceId = safeCell_(raceControlSheet, 'B3');
  const lockState = safeCell_(raceControlSheet, 'B8');
  if (String(lockState).toUpperCase() === 'LOCKED') {
    return { ok: false, error: 'Picks are locked for this race.' };
  }

  const validPlayers = ss.getSheetByName('Players').getRange('A2:B').getValues()
    .filter(r => r[0] && String(r[1]).toLowerCase() === 'active')
    .map(r => String(r[0]));
  if (!validPlayers.includes(player)) return { ok: false, error: 'Unknown or inactive player.' };

  const drivers = readDrivers_(driverGridSheet);
  const selectedDriver = drivers.find(d => d.name === driver || String(d.name).toLowerCase() === driver.toLowerCase());
  if (!selectedDriver) return { ok: false, error: 'Unknown driver.' };
  if (selectedDriver.status === 'Taken') return { ok: false, error: 'That driver is already taken.' };

  const existingPick = currentPickForPlayer_(picksSheet, player);
  if (existingPick && existingPick !== 'Pending') {
    return { ok: false, error: player + ' already picked ' + existingPick + '.' };
  }

  updatePlayerPick_(picksSheet, player, selectedDriver, raceId);
  updateLeaderboardPick_(leaderboardSheet, player, selectedDriver, raceId);
  updateDriverGridPick_(driverGridSheet, selectedDriver.name, player, raceId);

  return { ok: true, message: player + ' picked ' + selectedDriver.name + '.' };
}

function currentPickForPlayer_(sheet, player) {
  const rows = sheet.getRange('A1:F30').getDisplayValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === player) {
      const pick = String(rows[i][1] || '').trim();
      return pick || 'Pending';
    }
  }
  return '';
}

function updatePlayerPick_(sheet, player, driver, raceId) {
  const rows = sheet.getRange('A1:F30').getDisplayValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === player) {
      sheet.getRange(i + 1, 1, 1, 6).setValues([[
        player,
        driver.name,
        driver.carNumber || '',
        raceId,
        'No',
        new Date()
      ]]);
      return;
    }
  }
  sheet.appendRow([player, driver.name, driver.carNumber || '', raceId, 'No', new Date()]);
}

function updateLeaderboardPick_(sheet, player, driver, raceId) {
  const rows = sheet.getRange('A1:G30').getDisplayValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]).trim() === player) {
      sheet.getRange(i + 1, 1, 1, 7).setValues([[
        player,
        driver.carNumber || '',
        driver.name,
        raceId,
        '',
        0,
        'No'
      ]]);
      return;
    }
  }
  sheet.appendRow([player, driver.carNumber || '', driver.name, raceId, '', 0, 'No']);
}

function updateDriverGridPick_(sheet, driverName, player, raceId) {
  const rows = sheet.getRange('A1:I40').getDisplayValues();
  for (let i = 2; i < rows.length; i++) {
    if (String(rows[i][1]).trim() === driverName) {
      sheet.getRange(i + 1, 6, 1, 3).setValues([[raceId, 'Taken', player]]);
      return;
    }
  }
}

function readLeaderboard_(sheet) {
  const raw = sheet.getRange('A1:G30').getDisplayValues();
  const rows = raw.slice(1).filter(r => r[0]);
  const leaderboard = rows.map((r, i) => {
    let carNumber = r[1];
    let pick = r[2];

    if (!looksLikeCarNumber_(carNumber) && looksLikeCarNumber_(pick)) {
      const driverName = carNumber;
      carNumber = pick;
      pick = driverName;
    }

    return {
      rank: i + 1,
      player: r[0],
      carNumber: carNumber,
      pick: pick || 'Pending',
      raceId: r[3],
      finish: r[4],
      points: Number(r[5]) || 0,
      exactP10: r[6],
      status: pick && pick !== 'Pending' ? 'Submitted' : 'Pending'
    };
  });
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

  return rows.slice(1)
    .filter(r => r.some(Boolean))
    .filter(r => String(r[summaryIndex] || r[dayIndex] || '').toLowerCase() !== 'no forecast loaded yet')
    .map((r, index) => ({
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

function isPlaceholderWeather_(weather) {
  if (!weather || !weather.length) return true;
  return weather.every(row => {
    const text = [row.temperature, row.precipitation, row.wind, row.summary].join(' ').toLowerCase();
    return text.includes('forecast pending') || text.includes('tbd') || text.includes('not loaded yet');
  });
}

function fetchRaceWeekendWeather_(upcoming) {
  try {
    const coords = raceCoordinates_(upcoming);
    if (!coords || !upcoming.date) return null;

    const raceDate = parseIsoDate_(upcoming.date);
    const startDate = upcoming.weekendStart || addDaysIso_(raceDate, -2);
    const qualifyingDate = addDaysIso_(parseIsoDate_(startDate), 1);
    const raceDateIso = toIsoDate_(raceDate);

    const url = 'https://api.open-meteo.com/v1/forecast'
      + '?latitude=' + encodeURIComponent(coords.lat)
      + '&longitude=' + encodeURIComponent(coords.lon)
      + '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max'
      + '&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=' + encodeURIComponent(coords.timezone)
      + '&start_date=' + encodeURIComponent(startDate)
      + '&end_date=' + encodeURIComponent(raceDateIso);

    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) return null;

    const payload = JSON.parse(response.getContentText());
    const daily = payload.daily || {};
    const rowsByDate = {};
    (daily.time || []).forEach((date, index) => {
      rowsByDate[date] = {
        weatherCode: daily.weather_code ? daily.weather_code[index] : '',
        high: daily.temperature_2m_max ? daily.temperature_2m_max[index] : '',
        low: daily.temperature_2m_min ? daily.temperature_2m_min[index] : '',
        precip: daily.precipitation_probability_max ? daily.precipitation_probability_max[index] : '',
        wind: daily.wind_speed_10m_max ? daily.wind_speed_10m_max[index] : ''
      };
    });

    return [
      buildWeatherRow_('Practice', startDate, rowsByDate[startDate]),
      buildWeatherRow_(upcoming.sprint === 'Yes' ? 'Sprint / Qualifying' : 'Qualifying', qualifyingDate, rowsByDate[qualifyingDate]),
      buildWeatherRow_('Race', raceDateIso, rowsByDate[raceDateIso])
    ].filter(Boolean);
  } catch (e) {
    return null;
  }
}

function buildWeatherRow_(day, date, data) {
  if (!data) return {
    day: day,
    date: date,
    temperature: 'Forecast unavailable',
    temp: 'Forecast unavailable',
    precipitation: 'Forecast unavailable',
    precip: 'Forecast unavailable',
    wind: 'Forecast unavailable',
    summary: 'Forecast unavailable'
  };

  const temp = round_(data.high) + '°F / ' + round_(data.low) + '°F';
  const precip = data.precip === '' || data.precip === null || data.precip === undefined ? 'Rain TBD' : round_(data.precip) + '% rain';
  const wind = data.wind === '' || data.wind === null || data.wind === undefined ? 'Wind TBD' : round_(data.wind) + ' mph';

  return {
    day: day,
    date: date,
    temperature: temp,
    temp: temp,
    precipitation: precip,
    precip: precip,
    wind: wind,
    summary: weatherCodeSummary_(data.weatherCode)
  };
}

function raceCoordinates_(upcoming) {
  const key = String((upcoming.city || '') + ', ' + (upcoming.country || '')).toLowerCase();
  if (key.indexOf('montreal') >= 0 && key.indexOf('canada') >= 0) {
    return { lat: 45.5017, lon: -73.5673, timezone: 'America/Toronto' };
  }
  return null;
}

function weatherCodeSummary_(code) {
  const numeric = Number(code);
  if ([0].indexOf(numeric) >= 0) return 'Clear';
  if ([1, 2].indexOf(numeric) >= 0) return 'Mostly clear';
  if ([3].indexOf(numeric) >= 0) return 'Overcast';
  if ([45, 48].indexOf(numeric) >= 0) return 'Fog';
  if ([51, 53, 55, 56, 57].indexOf(numeric) >= 0) return 'Drizzle risk';
  if ([61, 63, 65, 66, 67, 80, 81, 82].indexOf(numeric) >= 0) return 'Rain risk';
  if ([71, 73, 75, 77, 85, 86].indexOf(numeric) >= 0) return 'Snow risk';
  if ([95, 96, 99].indexOf(numeric) >= 0) return 'Thunderstorm risk';
  return 'Forecast available';
}

function parseIsoDate_(value) {
  const parts = String(value).split('-').map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function addDaysIso_(date, days) {
  const copy = new Date(date.getTime());
  copy.setDate(copy.getDate() + days);
  return toIsoDate_(copy);
}

function toIsoDate_(date) {
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

function round_(value) {
  if (value === '' || value === null || value === undefined) return 'TBD';
  return Math.round(Number(value));
}

function countReadyPicks_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const picks = ss.getSheetByName('Picks');
  if (!picks) return 0;
  return picks.getRange('B2:B30').getDisplayValues().flat().filter(v => v && v !== 'Pending').length;
}

function looksLikeCarNumber_(value) {
  return /^\d{1,3}$/.test(String(value || '').trim());
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