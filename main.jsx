// File: src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Renders the App component into the HTML div with id="root"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);