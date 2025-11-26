// src\pages\children\ChildDetailPage.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { ChildDetails } from "@/types/child";
import ConfirmModal from "@/components/common/ConfirmModal";
import { formatDate } from "@/utils/formatDate";
import { Button } from "@/components/ui/Button";

export default function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [child, setChild] = useState<ChildDetails | null>(null);
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (isDeleted) return;

    const controller = new AbortController();
    let isMounted = true;

    const fetchChild = async () => {
      try {
        const res = await api.get(`/children/${id}`, {
          signal: controller.signal,
        });
        if (isMounted) {
          setChild(res.data);
          setNewName(res.data.full_name);
        }
      } catch (error: any) {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED")
          return;
        const status = error.response?.status;
        if (status === 404 && isMounted && !isDeleted) {
          showToast("El perfil no existe o fue eliminado.", "error");
          navigate("/children", { replace: true });
        } else {
          showToast("Error al cargar datos del hijo.", "error");
        }
      }
    };

    fetchChild();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [id, showToast, navigate, isDeleted]);

  const handleSave = async () => {
    if (!newName || !child) return;
    setIsSaving(true);
    try {
      await api.put(`/children/${id}/name`, { full_name: newName });
      showToast("Nombre actualizado correctamente.", "success");
      setChild((prev) => (prev ? { ...prev, full_name: newName } : prev));
    } catch {
      showToast("Error al actualizar nombre.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/children/${id}`);
      setIsDeleted(true);
      showToast("Hijo eliminado correctamente.", "success");
      navigate("/children", { replace: true });
    } catch {
      showToast("Error al eliminar al hijo.", "error");
    }
  };

  if (!child) {
    return (
      <div className="p-4 text-center text-gray-700 dark:text-gray-300 transition-colors duration-300">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow space-y-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
        Perfil del Hijo
      </h1>

      {/* Formulario de edición */}
      <div className="space-y-4">
        <div>
          {/* 1. SOLUCIÓN: Agregamos htmlFor */}
          <label
            htmlFor="full_name"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
          >
            Nombre completo
          </label>
          {/* 1. SOLUCIÓN: Agregamos id */}
          <input
            id="full_name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          {/* 2. SOLUCIÓN: Agregamos htmlFor */}
          <label
            htmlFor="age"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
          >
            Edad
          </label>
          {/* 2. SOLUCIÓN: Agregamos id */}
          <input
            id="age"
            type="text"
            value={`${child.age_in_months} meses`}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          />
        </div>

        <div>
          {/* 3. SOLUCIÓN: Agregamos htmlFor */}
          <label
            htmlFor="birth_date"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
          >
            Fecha de nacimiento
          </label>
          {/* 3. SOLUCIÓN: Agregamos id */}
          <input
            id="birth_date"
            type="text"
            value={formatDate(child.birth_date)}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          />
        </div>

        <div>
          {/* 4. SOLUCIÓN: Agregamos htmlFor */}
          <label
            htmlFor="gender"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
          >
            Género
          </label>
          {/* 4. SOLUCIÓN: Agregamos id */}
          <input
            id="gender"
            type="text"
            value={child.gender.name}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          />
        </div>

        <div>
          {/* 5. SOLUCIÓN: Agregamos htmlFor */}
          <label
            htmlFor="family_asd"
            className="block text-sm text-gray-700 dark:text-gray-300 mb-1"
          >
            Antecedentes de TEA en la familia
          </label>
          {/* 5. SOLUCIÓN: Agregamos id */}
          <input
            id="family_asd"
            type="text"
            value={child.family_asd ? "Sí" : "No"}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
          />
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>Creado: {formatDate(child.created_at)}</p>
          <p>Última actualización: {formatDate(child.updated_at)}</p>
        </div>

        <Button
          onClick={handleSave}
          disabled={
            isSaving || newName.trim() === "" || newName === child.full_name
          }
          variant="primary"
          size="md"
          className="px-6 rounded-lg"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      {/* Acciones adicionales */}
      <div className="border-t dark:border-gray-700 pt-6 mt-4">
        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">
          Acciones
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() =>
              navigate(`/evaluation/qchat10/${child.id}`, {
                state: { childName: child.full_name },
              })
            }
            variant="primary"
            size="sm"
          >
            Iniciar Evaluación
          </Button>

          <Button
            onClick={() =>
              navigate(`/children/${child.id}/evaluations`, {
                state: { childName: child.full_name },
              })
            }
            variant="secondary"
            size="sm"
            className="px-4 py-2"
          >
            Ver historial
          </Button>
        </div>
      </div>

      {/* Zona peligrosa */}
      <div className="border-t dark:border-gray-700 pt-6 mt-4">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Eliminar hijo
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Esta acción es irreversible. Se eliminará este perfil y todas sus
          evaluaciones.
        </p>

        <Button
          onClick={() => setShowConfirmModal(true)}
          variant="danger"
          size="md"
          className="px-4 py-2 rounded-lg"
        >
          Eliminar hijo
        </Button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <ConfirmModal
          title="¿Estás seguro?"
          message="Esta acción eliminará permanentemente este perfil y todas sus evaluaciones."
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
