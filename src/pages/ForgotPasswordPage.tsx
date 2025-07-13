import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { FormEvent, ChangeEvent } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleRecover = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/password-recovery", { email });
      showToast(
        "Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
        "success"
      );
    } catch (error: any) {
      const detail =
        error.response?.data?.detail ||
        "Ocurrió un error. Verifica el correo o intenta más tarde.";
      showToast(detail, "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(/images/fondo.jpg)] bg-cover bg-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        {/* Botón Iniciar sesión */}
        <div className="mb-2">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-yellow-600 hover:text-yellow-700 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Iniciar sesión
          </button>
        </div>

        <h1 className="text-2xl font-bold text-center mb-4 text-yellow-600">
          Recuperar contraseña
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          Ingresa el correo con el que registraste tu cuenta. Te enviaremos un
          enlace para restablecer tu contraseña.
        </p>
        <form onSubmit={handleRecover} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border p-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded font-semibold transition-all"
          >
            Enviar enlace de recuperación
          </button>
        </form>
      </div>
    </div>
  );
}
