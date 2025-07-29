// src\pages\ResetPasswordPage.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  /* useEffect(() => {
    document.title = "Restablecer contraseña - Early ASD Screener";
  }, []); */
  const toastShownRef = useRef(false); //agregado para evitar doble toast del token invalido
  useEffect(() => {
    document.title = "Restablecer contraseña - Early ASD Screener";

    if (!token && !toastShownRef.current) {
      toastShownRef.current = true; //agregado para evitar doble toast del token invalido
      showToast("Token de recuperación inválido o ausente.", "error");
      navigate("/login");
    }
  }, [token, navigate, showToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      showToast("Completa todos los campos.", "error");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showToast("Las contraseñas no coinciden.", "error");
      return;
    }

    try {
      await api.post("/reset-password", {
        token,
        password: form.password,
        confirm_password: form.confirmPassword,
      });

      showToast("Contraseña restablecida exitosamente.", "success");
      navigate("/login");
    } catch (error: any) {
      let message = "Error al registrarse. Inténtalo nuevamente.";

      if (error.response?.data?.detail) {
        const detail = error.response.data.detail;
        if (typeof detail === "string") {
          message = detail;
        } else if (Array.isArray(detail) && detail[0]?.msg) {
          message = detail[0].msg.replace(/^Value error, /, "");
        }
      }
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/images/fondo.jpg)] bg-cover bg-center">
      <div className="p-6 w-full max-w-md bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
          Restablecer contraseña
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Nueva contraseña"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar nueva contraseña"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <Button type="submit" variant="primary" size="lg">
            Guardar nueva contraseña
          </Button>
        </form>
      </div>
    </div>
  );
}
