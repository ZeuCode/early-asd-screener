// src\components\child\ChildCard.tsx

import type { ChildResume } from "@/types/child";
import { useNavigate, Link } from "react-router";
import { Button } from "../ui/Button";

export default function ChildCard({
  child,
  displayId,
}: Readonly<{
  child: ChildResume;
  displayId: number;
}>) {
  const navigate = useNavigate();

  return (
    // 1. CAMBIO: El contenedor principal ahora es un 'div' con 'relative'
    // Esto evita el conflicto de anidación HTML (Link dentro de Link)
    <div className="group relative block bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-2 hover:shadow-md dark:hover:shadow-lg transition">
      {/* 2. NUEVO: El Link principal es ahora una capa invisible que cubre toda la tarjeta */}
      {/* 'z-0' o 'z-10' para que cubra el texto, pero quede debajo de los botones */}
      <Link
        to={`/children/${child.id}`}
        className="absolute inset-0 z-10"
        aria-label={`Ver detalles de ${child.full_name}`}
      />

      {/* Contenido de la tarjeta (Texto) */}
      <div className="flex justify-between items-center relative">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          {child.full_name}
          <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-xs font-semibold px-2 py-0.5 rounded-full">
            #{displayId}
          </span>
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 relative">
        Edad: {child.age_in_months} meses
      </p>

      {/* 3. CAMBIO CRÍTICO: Los botones deben tener 'relative' y un 'z-index' mayor al del Link (z-20) */}
      {/* Esto asegura que estén FÍSICAMENTE encima de la capa del enlace */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2 relative z-20">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            // Ya no necesitas stopPropagation porque los botones ya no están DENTRO del Link, sino ENCIMA.
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
          onClick={() => {
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
