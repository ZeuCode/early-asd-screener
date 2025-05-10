import { useState } from "react";
//import { isValidAgeInMonths } from ""
import { useNavigate } from "react-router";
import { isValidAgeInMonths } from "../utils/validateAge";

export default function AddChildPage() {
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(birthDate);
    const isValid = isValidAgeInMonths(date);
    if (!isValid)
      return alert("Edad no válida. Debe tener entre 16 y 30 meses.");

    alert("Hijo registrado (simulado)");
    navigate("/dashboard");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registrar hijo</h1>
      <form onSubmit={handleAdd} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          className="border p-2 rounded"
          required
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Registrar
        </button>
      </form>
    </div>
  );
}
