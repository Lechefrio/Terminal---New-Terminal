# Pick 10th — F1 Fantasy Web App

This repository contains the Pick 10th fantasy F1 game frontend.

## Current frontend

The active production frontend is the React + Vite app inside:

```text
f1-pick-10th-v2/
```

Netlify builds from that folder and publishes the Vite `dist` output.

## Architecture

Google Sheets → Apps Script Web API → React/Vite frontend → Netlify website → Players

The spreadsheet remains the backend/database. The React app provides the player-facing frontend.

## Netlify build settings

```text
Base directory: f1-pick-10th-v2
Build command: npm run build
Publish directory: dist
```

## Environment variables

The React frontend expects this Netlify environment variable:

```text
VITE_API_BASE_URL
```

It should point to the deployed Apps Script Web App URL.

## Legacy version 1 files

The root files below are retained as the earlier simple frontend/backend reference:

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `apps-script-code.gs`

## React/Vite development

From inside `f1-pick-10th-v2`:

```bash
npm install
npm run dev
npm run build
```

## Next planned upgrades

- live leaderboard polish
- pick submission form
- driver cards
- race weekend status
- countdown/lock timer
- weather widget
- mobile layout polish
