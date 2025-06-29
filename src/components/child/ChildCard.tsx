// src\components\child\ChildCard.tsx
import type { Child } from "@/types/child";
import { useNavigate } from "react-router";
import { getAgeInMonths } from "@/utils/getAgeInMonths";

export default function ChildCard({ child }: { child: Child }) {
  const navigate = useNavigate();
  const ageInMonths = getAgeInMonths(new Date(child.birth_date));

  return (
    <div className="bg-white shadow rounded-xl p-4 border border-gray-200 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800">{child.full_name}</h3>
      <p className="text-sm text-gray-600">Edad: {ageInMonths} meses</p>

      <div className="pt-2 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() =>
            navigate(`/evaluation/qchat10/${child.id}`, {
              state: { childName: child.full_name },
            })
          }
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition"
        >
          Iniciar Evaluación
        </button>
        <button
          onClick={() =>
            navigate(`/children/${child.id}/evaluations`, {
              state: { childName: child.full_name },
            })
          }
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded border border-blue-300 transition"
        >
          Ver historial
        </button>
      </div>
    </div>
  );
}
