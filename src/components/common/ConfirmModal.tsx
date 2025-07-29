// src\components\common\ConfirmModal.tsx
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <h3 className="text-lg font-semibold text-red-600 mb-4">{title}</h3>
        <p className="text-sm text-gray-700 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          {/* <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-100"
          >
            {cancelText}
          </button> */}
          <Button variant="outline" onClick={onCancel}>
            {cancelText}
          </Button>
          {/* <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            {confirmText}
          </button> */}

          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
