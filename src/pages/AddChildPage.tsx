// src/pages/AddChildPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { isValidAgeInMonths } from "../utils/validateAge";
import { useToast } from "../context/ToastContext";

export default function AddChildPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("male");
  const [hasAutisticFamilyMembers, setHasAutisticFamilyMembers] = useState<
    "yes" | "no" | ""
  >("");

  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();

    const date = new Date(birthDate);
    if (!isValidAgeInMonths(date)) {
      showToast("Edad no válida. Debe tener entre 12 y 36 meses.", "error");
      return;
    }

    if (!hasAutisticFamilyMembers) {
      showToast("Por favor indica si hay familiares con autismo.", "error");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      showToast("No hay sesión activa.", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/children/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: name,
          birth_date: birthDate,
          gender_id: gender === "male" ? 2 : 1,
          family_asd: hasAutisticFamilyMembers === "yes",
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        showToast(error.detail || "Error al registrar hijo", "error");
        return;
      }

      showToast("Hijo registrado exitosamente", "success");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      showToast("Error de conexión con el servidor.", "error");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
          Registrar Hijo o Hija
        </h1>
        <form onSubmit={handleAdd} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Nombre completo"
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            max={today}
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <select
            className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
          </select>

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

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold transition duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
