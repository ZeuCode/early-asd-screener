import { useNavigate } from "react-router";
import { useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { FormEvent, ChangeEvent } from "react";
import ConsentModal from "@/components/consent/ConsentModal";

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
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.password}
            onChange={handleChange}
          />
          <p className="text-xs text-gray-500 -mt-3 mb-1 ml-1">
            La contraseña debe tener al menos 8 caracteres, una mayúscula y un
            número.
          </p>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar contraseña"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {/* 
          <label className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 accent-green-600"
            />
            <span>
              Acepto el uso de mis datos para el propósito de esta aplicación
              según el <ConsentModal />.
            </span>
          </label> */}

          {/* ✅ Texto mejorado legalmente */}
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

          <button
            type="submit"
            disabled={!form.consent}
            className={`py-3 rounded-lg font-medium text-lg transition-all duration-200
              ${
                form.consent
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
