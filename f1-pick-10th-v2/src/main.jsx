import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.css";
import "./styles/v2-polish.css";
import "./styles/race-visual.css";
import "./styles/player-avatars.css";
import "./styles/grid-intel.css";
import "./styles/monaco-visual-test.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
