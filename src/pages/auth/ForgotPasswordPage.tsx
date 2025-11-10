// src\pages\ForgotPasswordPage.tsx
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { FormEvent, ChangeEvent } from "react";
import LinkButton from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/Button";

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
          <LinkButton
            onClick={() => navigate("/login")}
            className="text-yellow-600 hover:text-yellow-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Iniciar sesión
          </LinkButton>
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

          <Button
            type="submit"
            size="md"
            className="bg-yellow-500 hover:bg-yellow-600 text-white"
          >
            Enviar enlace de recuperación
          </Button>
        </form>
      </div>
    </div>
  );
}
