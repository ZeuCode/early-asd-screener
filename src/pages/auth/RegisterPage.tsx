// src/pages/auth/RegisterPage.tsx

import { useNavigate, Link } from "react-router"; // 1. Importamos Link
import { useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { FormEvent, ChangeEvent } from "react";
import ConsentModal from "@/components/consent/ConsentModal";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { getApiErrorMessage } from "@/utils/apiError";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });

  // Estado unificado para mostrar/ocultar ambas contraseñas
  const [showPasswords, setShowPasswords] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      showToast("Las contraseñas no coinciden.", "error");
      return;
    }

    if (!form.consent) {
      showToast("Debes aceptar el consentimiento informado.", "error");
      return;
    }

    try {
      await api.post("/register", {
        full_name: form.nombre,
        email: form.correo,
        password: form.password,
      });

      showToast("Cuenta creada exitosamente. Inicia sesión ahora.", "success");
      navigate("/login");
    } catch (error: any) {
      const message = getApiErrorMessage(
        error,
        "Error al registrarse. Inténtalo nuevamente."
      );
      showToast(message, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/images/fondo.jpg)] bg-cover bg-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Crear cuenta
        </h1>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo electrónico"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.correo}
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={form.password}
              onChange={handleChange}
            />
            {/* 2. SOLUCIÓN: Usamos <button type="button"> en lugar de <span> */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPasswords((prev) => !prev)}
              aria-label={
                showPasswords ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPasswords ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <p className="text-xs text-gray-500 -mt-3 mb-1 ml-1">
            La contraseña debe tener al menos 8 caracteres, una mayúscula y un
            número.
          </p>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {/* 2. SOLUCIÓN REPETIDA: Usamos <button type="button"> */}
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPasswords((prev) => !prev)}
              aria-label={
                showPasswords ? "Ocultar contraseña" : "Mostrar contraseña"
              }
            >
              {showPasswords ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 accent-green-600"
            />
            <span>
              He leído y acepto el <ConsentModal /> para el tratamiento de mis
              datos personales según lo descrito.
            </span>
          </label>

          <Button
            type="submit"
            disabled={!form.consent}
            variant={form.consent ? "primary" : "outline"}
            size="lg"
            className={
              form.consent ? "" : "text-gray-500 bg-gray-300 cursor-not-allowed"
            }
          >
            Registrarse
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          {/* 3. SOLUCIÓN: Usamos <Link> en lugar de <span> */}
          <Link to="/login" className="text-green-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
