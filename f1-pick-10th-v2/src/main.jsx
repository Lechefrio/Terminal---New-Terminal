import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.css";
import "./styles/v2-polish.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
