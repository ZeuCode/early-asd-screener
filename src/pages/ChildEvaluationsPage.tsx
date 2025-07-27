// // src\pages\ChildEvaluationsPage.tsx
// import { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router";
// import api from "@/api/axios";
// import { useToast } from "@/context/ToastContext";
// import type { Evaluation } from "@/types/evaluation";
// import EvaluationSummaryCard from "@/components/evaluation/EvaluationSummaryCard";
// import { ArrowLeft } from "lucide-react";

// export default function ChildEvaluationsPage() {
//   const { childId } = useParams();
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const childName = state?.childName || "Niño/a";
//   const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
//   const { showToast } = useToast();

//   useEffect(() => {
//     const fetchEvaluations = async () => {
//       try {
//         const res = await api.get(`/evaluations/${childId}`);
//         setEvaluations(res.data);
//       } catch (error) {
//         console.error(error);
//         showToast("Error al cargar las evaluaciones.", "error");
//       }
//     };

//     fetchEvaluations();
//   }, [childId, showToast]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-green-700">
//           Evaluaciones de {childName}
//         </h1>
//         <button
//           onClick={() => navigate("/children")}
//           className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100"
//         >
//           <ArrowLeft className="w-4 h-4" /> Volver
//         </button>
//       </div>

//       {evaluations.length === 0 ? (
//         <p className="text-gray-600">No hay evaluaciones registradas.</p>
//       ) : (
//         <div className="space-y-4">
//           {evaluations.map((ev) => (
//             <EvaluationSummaryCard key={ev.id} evaluation={ev} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { Evaluation } from "@/types/evaluation";
import type { ChildResume } from "@/types/child";
import EvaluationSummaryCard from "@/components/evaluation/EvaluationSummaryCard";
import { ArrowLeft } from "lucide-react";

export default function ChildEvaluationsPage() {
  const { childId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [childName, setChildName] = useState(state?.childName || "Niño/a");
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  /*   useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Verificar existencia del hijo
        const childRes = await api.get<ChildResume>(`/children/${childId}`);
        setChildName(childRes.data.full_name);

        // 2. Traer evaluaciones si el hijo existe
        const evalRes = await api.get<Evaluation[]>(`/evaluations/${childId}`);
        setEvaluations(evalRes.data);
      } catch (error: any) {
        const status = error.response?.status;
        if (status === 404) {
          showToast("El niño/a ya no existe o fue eliminado.", "error");
          navigate("/children", { replace: true });
        } else {
          showToast("Error al cargar las evaluaciones.", "error");
          console.error(error);
        }
      }
    };

    fetchData();
  }, [childId, showToast, navigate]);
 */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const childRes = await api.get<ChildResume>(`/children/${childId}`);
        setChildName(childRes.data.full_name);

        const evalRes = await api.get<Evaluation[]>(`/evaluations/${childId}`);
        setEvaluations(evalRes.data);
      } catch (err: any) {
        const status = err?.response?.status;

        // ✅ Prevenimos el error 404 en consola
        if (status === 404) {
          showToast("El niño/a ya no existe o fue eliminado.", "error");
          navigate("/children", { replace: true });
          return; // 👈 Importante para cortar ejecución
        }

        // ✅ Solo logueamos otros errores
        showToast("Error al cargar las evaluaciones.", "error");

        // 👇 Solo mostramos en consola si NO es 404
        if (status !== 404) {
          console.error("Error inesperado:", err);
        }
      }
    };

    fetchData();
  }, [childId, showToast, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">
          Evaluaciones de {childName}
        </h1>
        <button
          onClick={() => navigate("/children")}
          className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" /> Volver
        </button>
      </div>

      {evaluations.length === 0 ? (
        <p className="text-gray-600">No hay evaluaciones registradas.</p>
      ) : (
        <div className="space-y-4">
          {evaluations.map((ev) => (
            <EvaluationSummaryCard key={ev.id} evaluation={ev} />
          ))}
        </div>
      )}
    </div>
  );
}
