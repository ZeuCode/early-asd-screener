// src\components\child\ChildCard.tsx

import type { ChildResume } from "@/types/child";
import { useNavigate } from "react-router";
import { Button } from "../ui/Button";

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
        <Button
          variant="primary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/evaluation/qchat10/${child.id}`, {
              state: { childName: child.full_name },
            });
          }}
        >
          Iniciar Evaluación
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/children/${child.id}/evaluations`, {
              state: { childName: child.full_name },
            });
          }}
        >
          Ver historial
        </Button>
      </div>
    </div>
  );
}
