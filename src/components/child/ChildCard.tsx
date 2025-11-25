// src\components\child\ChildCard.tsx

import type { ChildResume } from "@/types/child";
import { useNavigate } from "react-router";
import { Button } from "../ui/Button";

export default function ChildCard({
  child,
  displayId,
}: {
  child: ChildResume;
  displayId: number;
}) {
  const navigate = useNavigate();

  const goToDetails = () => navigate(`/children/${child.id}`);

  return (
    <div
      onClick={goToDetails}
      className="cursor-pointer bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-2 hover:shadow-md dark:hover:shadow-lg transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          {child.full_name}
          {/* Badge del ID */}
          <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs font-semibold px-2 py-0.5 rounded-full">
            #{displayId}
          </span>
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Edad: {child.age_in_months} meses
      </p>

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
