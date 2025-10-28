// src\pages\LoginPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
//import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  //const { login } = useAuth();
  const [form, setForm] = useState({
    correo: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Iniciar sesión - Early ASD Screener";
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.correo || !form.password) {
      showToast("Completa todos los campos.", "error");
      return;
    }

    try {
      const response = await api.post(
        "/login",
        new URLSearchParams({
          username: form.correo,
          password: form.password,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user_name", response.data.user.full_name);

      // centralizamos la lógica en login()
      //await login(response.data.access_token);

      showToast("Inicio de sesión exitoso", "success");
      navigate("/dashboard", { replace: true });
      //navigate("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      const detail =
        error.response?.data?.detail || "Usuario o contraseña incorrectos.";
      showToast(detail, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/images/fondo.jpg)] bg-cover bg-center">
      <div className="p-6 w-full max-w-md bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-center text-green-700 mb-1">
          Early ASD Screener
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Plataforma para la detección temprana del riesgo de autismo en niños
        </p>

        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            className="border p-2 rounded"
            required
            value={form.correo}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="border p-2 rounded"
            required
            value={form.password}
            onChange={handleChange}
          />
          <div className="text-right">
            <span
              className="text-sm text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/forgot-password")}
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <Button type="submit" variant="primary" size="md">
            Iniciar sesión
          </Button>
          <p className="text-sm text-center">
            ¿No tienes cuenta?{" "}
            <span
              className="text-green-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Regístrate aquí
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
