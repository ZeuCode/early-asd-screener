// src\pages\EvaluationStartPage.tsx
/* // src\pages\EvaluationStartPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { Child } from "@/types/child";
import { getAgeInMonths } from "@/utils/getAgeInMonths";

export default function EvaluationStartPage() {
  const [children, setChildren] = useState<Child[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get("/children/");
        setChildren(res.data);
      } catch (error) {
        console.error(error);
        showToast("Error al cargar hijos para evaluación.", "error");
      }
    };

    fetchChildren();
  }, [showToast]);

  const eligibleChildren = children.filter((child) => {
    const birth = new Date(child.birth_date);
    const age = getAgeInMonths(birth);
    return age >= 12 && age <= 36;
  });

  return (
    <div className="h-full bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        Iniciar Evaluación
      </h1>
      <p className="text-gray-700 mb-6">
        Selecciona uno de tus hijos para realizar la evaluación Q-CHAT-10.
      </p>

      {eligibleChildren.length === 0 ? (
        <p className="text-gray-600">
          No tienes hijos elegibles (12 a 36 meses) para iniciar una evaluación.
        </p>
      ) : (
        <div className="space-y-4">
          {eligibleChildren.map((child) => (
            <div
              key={child.id}
              className="bg-white p-4 rounded shadow border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {child.full_name}
                </h3>
                <p className="text-sm text-gray-600">
                  Edad: {getAgeInMonths(new Date(child.birth_date))} meses
                </p>
              </div>
              <button
                onClick={() => navigate(`/evaluation/qchat10/${child.id}`)}
                className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded transition"
              >
                Empezar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 */
