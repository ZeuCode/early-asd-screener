// src\pages\AddChildPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { useToast } from "@/context/ToastContext";
import api from "@/api/axios";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export default function AddChildPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [hasAutisticFamilyMembers, setHasAutisticFamilyMembers] = useState<
    "yes" | "no" | ""
  >("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (!hasAutisticFamilyMembers) {
      showToast("Por favor indica si hay familiares con autismo.", "error");
      return;
    }

    try {
      await api.post("/children/", {
        full_name: name,
        birth_date: birthDate,
        gender_id: gender === "male" ? 2 : 1,
        family_asd: hasAutisticFamilyMembers === "yes",
      });

      showToast("Hijo registrado exitosamente", "success");
      navigate("/dashboard");
    } catch (error: any) {
      const detail = error.response?.data?.detail || "Error al registrar hijo.";
      showToast(detail, "error");
      console.error(error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-950 flex items-center justify-center px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-center text-green-700 dark:text-green-400 mb-6">
          Registrar Hijo o Hija
        </h1>

        <form onSubmit={handleAdd} className="flex flex-col gap-5">
          {/* Nombre */}
          <div className="flex flex-col">
            {/* 1. SOLUCIÓN: Agregamos htmlFor */}
            <label
              htmlFor="full_name"
              className="text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium"
            >
              Nombre completo
            </label>
            {/* 1. SOLUCIÓN: Agregamos id coincidente */}
            <input
              id="full_name"
              type="text"
              placeholder="Ej: Mateo Pérez"
              className="border border-gray-300 dark:border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col">
            <label
              htmlFor="birth_date"
              className="text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium"
            >
              Fecha de nacimiento
            </label>
            <input
              id="birth_date"
              type="date"
              max={today}
              autoComplete="off"
              className="appearance-none border border-gray-300 dark:border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 italic mt-1">
              * Solo se permiten niños entre 12 y 36 meses de edad (validado
              automáticamente).
            </p>
          </div>

          {/* Género */}
          <div className="flex flex-col">
            <label
              htmlFor="gender"
              className="text-sm text-gray-700 dark:text-gray-300 mb-1 font-medium"
            >
              Género
            </label>
            <select
              id="gender"
              className="border border-gray-300 dark:border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          {/* Radio autismo */}
          <div className="text-center">
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 font-medium">
              ¿Tiene familiares con diagnóstico de autismo?
            </p>
            <div className="flex justify-center gap-6">
              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="asdFamily"
                  value="yes"
                  checked={hasAutisticFamilyMembers === "yes"}
                  onChange={() => setHasAutisticFamilyMembers("yes")}
                  // Los radios no necesitan id si están DENTRO del label,
                  // pero el texto suelto causa el error de espaciado.
                />
                {/* 2. SOLUCIÓN: Envolvemos el texto en un span */}
                <span>Sí</span>
              </label>

              <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="radio"
                  name="asdFamily"
                  value="no"
                  checked={hasAutisticFamilyMembers === "no"}
                  onChange={() => setHasAutisticFamilyMembers("no")}
                />
                {/* 2. SOLUCIÓN: Envolvemos el texto en un span */}
                <span>No</span>
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" size="md">
            Registrar
          </Button>
        </form>
      </div>
    </div>
  );
}
