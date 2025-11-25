// src\api\axios.ts

import axios from "axios";

// Crear una instancia de axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // Opcional: tiempo máximo de espera en ms
});

// Interceptor para añadir el token automáticamente a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar errores globales (opcional pero útil)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("No autorizado – token inválido o expirado");
      // Aquí podrías redirigir al login o limpiar el token si quieres
    }
    return Promise.reject(error);
  }
);
export function setAuthToken(token?: string | null) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export default api;
