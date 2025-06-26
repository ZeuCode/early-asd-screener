// src\main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import { ToastProvider } from "./context/ToastContext"; // 👈

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        {/* 👈 Aquí lo envolvemos */}
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
