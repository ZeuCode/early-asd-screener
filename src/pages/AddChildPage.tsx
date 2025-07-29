// src\pages\AddChildPage.tsx
// src/pages/AddChildPage.tsx
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
    <div className="h-full bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Registrar Hijo o Hija
        </h1>

        <form onSubmit={handleAdd} className="flex flex-col gap-5">
          {/* Nombre */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1 font-medium">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Ej: Mateo Pérez"
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Fecha de nacimiento */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1 font-medium">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              max={today}
              autoComplete="off"
              className="appearance-none border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
            <p className="text-xs text-gray-500 italic mt-1">
              * Solo se permiten niños entre 12 y 36 meses de edad (validado
              automáticamente).
            </p>
          </div>

          {/* Género */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1 font-medium">
              Género
            </label>
            <select
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
            </select>
          </div>

          {/* Radio autismo */}
          <div className="text-center">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              ¿Tiene familiares con diagnóstico de autismo?
            </p>
            <div className="flex justify-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="asdFamily"
                  value="yes"
                  checked={hasAutisticFamilyMembers === "yes"}
                  onChange={() => setHasAutisticFamilyMembers("yes")}
                />
                Sí
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="asdFamily"
                  value="no"
                  checked={hasAutisticFamilyMembers === "no"}
                  onChange={() => setHasAutisticFamilyMembers("no")}
                />
                No
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
