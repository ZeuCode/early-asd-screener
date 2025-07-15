// src/pages/ChildDetailPage.tsx

/* 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { ChildDetails } from "@/types/child";

export default function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [child, setChild] = useState<ChildDetails | null>(null);
  const [newName, setNewName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  /* 
  useEffect(() => {
    let isMounted = true;

    const fetchChild = async () => {
      try {
        const res = await api.get(`/children/${id}`);
        if (isMounted) {
          setChild(res.data);
          setNewName(res.data.full_name);
        }
      } catch (error: any) {
        if (isMounted) {
          const status = error.response?.status;
          if (status !== 404) {
            showToast("Error al cargar datos del hijo.", "error");
          }
        }
      }
    };

    fetchChild();
    return () => {
      isMounted = false;
    };
  }, [id, showToast]); */

/* useEffect(() => {
    const controller = new AbortController();

    const fetchChild = async () => {
      try {
        const res = await api.get(`/children/${id}`, {
          signal: controller.signal,
        });
        setChild(res.data);
        setNewName(res.data.full_name);
      } catch (error: any) {
        if (error.name === "CanceledError" || error.code === "ERR_CANCELED")
          return;
        if (error.response?.status !== 404) {
          showToast("Error al cargar datos del hijo.", "error");
        }
      }
    };

    fetchChild();

    return () => {
      controller.abort(); // Cancela la petición si el componente se desmonta
    };
  }, [id, showToast]); 

  useEffect(() => {
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
        if (
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED" ||
          error.message === "canceled"
        ) {
          return;
        }

        const status = error.response?.status;
        if (status === 404) {
          if (isMounted) {
            showToast("El perfil no existe o fue eliminado.", "error");
            navigate("/children", { replace: true });
          }
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
  }, [id, showToast, navigate]);

  const handleSave = async () => {
    try {
      await api.put(`/children/${id}/name`, { full_name: newName });
      showToast("Nombre actualizado correctamente.", "success");
      setChild((prev) => (prev ? { ...prev, full_name: newName } : prev));
    } catch (error) {
      console.error(error);
      showToast("Error al actualizar nombre.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/children/${id}`);
      showToast("Hijo eliminado correctamente.", "success");
      navigate("/children", { replace: true });
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar al hijo.", "error");
    }
  };

  if (!child) return <p className="p-4 text-gray-600">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Perfil del Hijo</h2>

      <div className="space-y-2 bg-white p-4 rounded-xl shadow border">
        <label className="text-sm text-gray-600">Nombre completo</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-800"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition mt-2"
        >
          Guardar cambios
        </button>
      </div>

      <div className="space-y-1 text-sm text-gray-700 bg-white p-4 rounded-xl shadow border">
        <p>
          <strong>Edad:</strong> {child.age_in_months} meses
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong> {child.birth_date}
        </p>
        <p>
          <strong>Género:</strong> {child.gender.name}
        </p>
        <p>
          <strong>Antecedentes de TEA en familia:</strong>{" "}
          {child.family_asd ? "Sí" : "No"}
        </p>
        <p className="text-gray-500 text-xs">
          Creado: {new Date(child.created_at).toLocaleString()}
          <br />
          Última actualización: {new Date(child.updated_at).toLocaleString()}
        </p>
      </div>

      <div className="text-right">
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-red-100 hover:bg-red-200 text-red-800 text-sm px-4 py-2 rounded border border-red-300 transition"
        >
          Eliminar hijo
        </button>
      </div>

      {/* Modal de confirmación 
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              ¿Estás seguro?
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Esta acción eliminará permanentemente este perfil y todas sus
              evaluaciones.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar eliminación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 */

// src/pages/ChildDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { ChildDetails } from "@/types/child";

export default function ChildDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [child, setChild] = useState<ChildDetails | null>(null);
  const [newName, setNewName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); // <- nuevo estado

  useEffect(() => {
    if (isDeleted) return; // evita fetch si ya fue eliminado

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
        if (
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED" ||
          error.message === "canceled"
        ) {
          return;
        }

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
    try {
      await api.put(`/children/${id}/name`, { full_name: newName });
      showToast("Nombre actualizado correctamente.", "success");
      setChild((prev) => (prev ? { ...prev, full_name: newName } : prev));
    } catch (error) {
      console.error(error);
      showToast("Error al actualizar nombre.", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/children/${id}`);
      setIsDeleted(true); // <- importante
      showToast("Hijo eliminado correctamente.", "success");
      navigate("/children", { replace: true });
    } catch (error) {
      console.error(error);
      showToast("Error al eliminar al hijo.", "error");
    }
  };

  if (!child) return <p className="p-4 text-gray-600">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Perfil del Hijo</h2>

      <div className="space-y-2 bg-white p-4 rounded-xl shadow border">
        <label className="text-sm text-gray-600">Nombre completo</label>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="w-full border px-3 py-2 rounded text-gray-800"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition mt-2"
        >
          Guardar cambios
        </button>
      </div>

      <div className="space-y-1 text-sm text-gray-700 bg-white p-4 rounded-xl shadow border">
        <p>
          <strong>Edad:</strong> {child.age_in_months} meses
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong> {child.birth_date}
        </p>
        <p>
          <strong>Género:</strong> {child.gender.name}
        </p>
        <p>
          <strong>Antecedentes de TEA en familia:</strong>{" "}
          {child.family_asd ? "Sí" : "No"}
        </p>
        <p className="text-gray-500 text-xs">
          Creado: {new Date(child.created_at).toLocaleString()}
          <br />
          Última actualización: {new Date(child.updated_at).toLocaleString()}
        </p>
      </div>

      <div className="text-right">
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-red-100 hover:bg-red-200 text-red-800 text-sm px-4 py-2 rounded border border-red-300 transition"
        >
          Eliminar hijo
        </button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              ¿Estás seguro?
            </h3>
            <p className="text-sm text-gray-700 mb-6">
              Esta acción eliminará permanentemente este perfil y todas sus
              evaluaciones.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar eliminación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
