// src\pages\UserProfilePage.tsx

import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useToast } from "@/context/ToastContext";
import type { UserProfile } from "@/types/user";
import ConfirmModal from "@/components/common/ConfirmModal";
import { formatDate } from "@/utils/formatDate";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

export default function UserProfilePage() {
  const { theme, setTheme } = useTheme();
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
      localStorage.setItem("user_name", res.data.full_name);
    } catch {
      showToast("Error al actualizar perfil", "error");
    } finally {
      setIsSaving(false);
    }
  };

  /*   const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as "light" | "dark";
    if (newTheme === theme) return;
    setTheme(newTheme); // actualiza localStorage + backend instantáneamente
    showToast("Tema cambiado", "info");
  }; */

  const handleThemeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as "light" | "dark";
    if (newTheme === theme) return;

    const success = await setTheme(newTheme);
    if (success) {
      showToast("Tema cambiado correctamente", "success");
    } else {
      showToast("Error al cambiar el tema", "error");
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

  if (!profile)
    return <div className="p-4 text-center">Cargando perfil...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 rounded-xl shadow space-y-6">
      <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
        Mi Perfil
      </h1>

      <div className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-sm mb-1">Nombre completo</label>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-1">Correo electrónico</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          />
        </div>

        {/* Fechas */}
        <div>
          <label className="block text-sm mb-1">Fecha de registro</label>
          <input
            type="text"
            value={formatDate(profile.created_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Consentimiento</label>
          <input
            type="text"
            value={formatDate(profile.consent_given_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Última actualización</label>
          <input
            type="text"
            value={formatDate(profile.updated_at)}
            disabled
            className="w-full border p-3 rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
          />
        </div>

        {/* Preferencia de tema */}
        <div>
          <label className="block text-sm mb-1 items-center gap-2">
            Preferencia de tema
            {theme === "dark" ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="w-full border p-3 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </div>

        {/* Guardar cambios */}

        <Button
          onClick={handleSave}
          disabled={
            isSaving ||
            editedName.trim() === "" ||
            editedName === profile.full_name
          }
          variant="primary"
          size="lg"
          className="px-6"
        >
          {isSaving ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>

      {/* Sección peligrosa */}
      <div className="border-t pt-6 mt-4 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
          Eliminar cuenta
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Esta acción es irreversible. Todos tus datos serán eliminados.
        </p>

        <Button
          onClick={() => setShowConfirmModal(true)}
          variant="danger"
          size="md"
          className="px-4 rounded-lg"
        >
          Eliminar cuenta
        </Button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <ConfirmModal
          title="¿Estás seguro?"
          message="Esta acción eliminará permanentemente tu cuenta y todos tus datos."
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleDeleteAccount}
        />
      )}
    </div>
  );
}
