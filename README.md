# Pick 10th — Version 1 Web App

This is a Netlify-ready frontend for the Pick 10th fantasy F1 game.

## Architecture

Google Sheets → Apps Script Web API → Netlify website → Players

The spreadsheet remains the backend/database. This app provides the player-facing frontend.

## Files

- `index.html` — app shell
- `styles.css` — F1-inspired black/red UI
- `app.js` — dashboard, leaderboard, pick form, driver board logic
- `config.sample.js` — copy to `config.js` and add Apps Script URL/token
- `apps-script-code.gs` — paste into Google Apps Script attached to the spreadsheet
- `netlify.toml` — Netlify config

## Step 1 — Apps Script API

1. Open your Google Sheet.
2. Go to Extensions → Apps Script.
3. Add a new script file or replace your web API file with `apps-script-code.gs`.
4. Change this line in both Apps Script and `config.js`:

```js
change-this-private-league-token
```

Use the same private token in both places.

5. Deploy → New deployment.
6. Select type: Web app.
7. Execute as: Me.
8. Who has access: Anyone with the link.
9. Deploy.
10. Copy the Web App URL.

## Step 2 — Frontend Config

Copy `config.sample.js` to `config.js`.

Paste your Apps Script Web App URL:

```js
window.PICK10TH_API_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
window.PICK10TH_API_TOKEN = "your-private-token";
```

## Step 3 — GitHub

Create a new repo, for example:

```text
f1-pick-10th-web
```

Upload these files to the repo.

## Step 4 — Netlify

1. Open Netlify.
2. Add new site → Import from Git.
3. Choose the GitHub repo.
4. Build command: leave blank.
5. Publish directory: `.`
6. Deploy.

## Step 5 — Test

Open the Netlify URL.

Expected behavior:

- Dashboard loads race/player info.
- Leaderboard loads from the sheet.
- Driver board loads from Driver Grid.
- Pick form submits to the Picks tab.

## Notes

This Version 1 app intentionally keeps the stack simple.

Later upgrades can add:

- player PINs
- admin-only pages
- authentication
- custom domain
- Firebase/Supabase database
- live race scoring animations
