/**
 * NBB Knowledge Hive
 * - React + Vite + TypeScript + Tailwind
 * - Mock data only (no secrets or external APIs)
 * - Safe demo: client-side search & filters, document viewer, bookmarks
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
