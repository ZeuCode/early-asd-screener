// src\components\common\ConfirmModal.tsx
// src/components/common/ConfirmModal.tsx
import { Button } from "../ui/Button";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg dark:shadow-gray-900/30 max-w-sm w-full transition-colors duration-300">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
          {message}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
