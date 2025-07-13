// src/pages/UserProfilePage.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";

interface UserProfile {
  id: number;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
  consent_given_at: string;
  updated_at: string;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedName, setEditedName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setProfile(res.data);
        setEditedName(res.data.full_name);
      } catch {
        showToast("Error al cargar perfil", "error");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!editedName || !profile) return;
    setIsSaving(true);
    try {
      const res = await api.put("/users/me", { full_name: editedName });
      setProfile(res.data);
      showToast("Perfil actualizado correctamente", "success");
      localStorage.setItem("user_name", res.data.full_name); // ← importante
    } catch {
      showToast("Error al actualizar perfil", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/users/me");
      showToast("Cuenta eliminada exitosamente", "success");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch {
      showToast("Error al eliminar cuenta", "error");
    }
  };

  if (!profile) {
    return <div className="p-4 text-center">Cargando perfil...</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-green-600">Mi Perfil</h1>

      {/* Formulario de perfil */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Fecha de registro
          </label>
          <input
            type="text"
            value={formatDate(profile.created_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Consentimiento
          </label>
          <input
            type="text"
            value={formatDate(profile.consent_given_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Última actualización
          </label>
          <input
            type="text"
            value={formatDate(profile.updated_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={
            isSaving ||
            editedName.trim() === "" ||
            editedName === profile.full_name
          }
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {/* Sección peligrosa */}
      <div className="border-t pt-6 mt-4">
        <h2 className="text-lg font-semibold text-red-600 mb-2">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Esta acción es irreversible. Todos tus datos serán eliminados.
        </p>
        <button
          onClick={() => setShowConfirmModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Eliminar cuenta
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
              Esta acción eliminará permanentemente tu cuenta y todos tus datos.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteAccount}
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
