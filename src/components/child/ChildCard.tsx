// src/components/child/ChildCard.tsx
import type { ChildResume } from "@/types/child";
import { useNavigate } from "react-router";

export default function ChildCard({ child }: { child: ChildResume }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/children/${child.id}`);
  };

  return (
    <div
      onClick={goToDetails}
      className="cursor-pointer bg-white shadow rounded-xl p-4 border border-gray-200 space-y-2 hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-gray-800">{child.full_name}</h3>
      <p className="text-sm text-gray-600">Edad: {child.age_in_months} meses</p>

      <div className="pt-2 flex flex-col sm:flex-row gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation(); // ⛔ Evita que el click en el botón dispare el click de la card
            navigate(`/evaluation/qchat10/${child.id}`, {
              state: { childName: child.full_name },
            });
          }}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition"
        >
          Iniciar Evaluación
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/children/${child.id}/evaluations`, {
              state: { childName: child.full_name },
            });
          }}
          className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-4 py-2 rounded border border-blue-300 transition"
        >
          Ver historial
        </button>
      </div>
    </div>
  );
}
