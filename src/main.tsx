// src\main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ToastProvider } from "./context/ToastContext"; // 👈

import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ThemeProvider>
          {/* 👈 Aquí lo envolvemos */}
          <App />
        </ThemeProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
