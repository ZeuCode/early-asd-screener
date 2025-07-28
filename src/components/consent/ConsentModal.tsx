// src\components\consent\ConsentModal.tsx
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export default function ConsentModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-green-600 underline hover:text-green-800"
      >
        consentimiento informado
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl overflow-y-auto max-h-[80vh]">
            <DialogTitle className="text-2xl font-bold mb-4 text-green-700">
              Consentimiento Informado
            </DialogTitle>
            <div className="space-y-4 text-gray-700 text-justify text-sm">
              <p>
                En cumplimiento de la Ley N° 29733 – Ley de Protección de Datos
                Personales, informamos lo siguiente:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Responsable del tratamiento:</strong> Esta aplicación
                  ha sido desarrollada con fines educativos e informativos para
                  identificar indicadores tempranos de riesgo de autismo en
                  niños pequeños. Para cualquier consulta, puede escribir a{" "}
                  <strong>micorreo@example.com</strong>.
                </li>
                <li>
                  <strong>Finalidad:</strong> Los datos se utilizarán
                  exclusivamente para el registro de usuarios, asociación de
                  hijos, aplicación del cuestionario Q-CHAT-10 y análisis
                  automatizado mediante inteligencia artificial.
                </li>
                <li>
                  <strong>Datos recolectados:</strong> Nombre completo, correo
                  electrónico, información de los hijos (nombre, fecha de
                  nacimiento, género, antecedentes familiares) y respuestas al
                  cuestionario.
                </li>
                <li>
                  <strong>Tratamiento y almacenamiento:</strong> Los datos serán
                  almacenados en una base de datos segura, no serán compartidos
                  con terceros y se utilizarán únicamente para los fines de esta
                  aplicación.
                </li>
                <li>
                  <strong>Uso futuro:</strong> Los datos podrían ser usados en
                  el futuro, de forma anónima y agregada, para mejorar el
                  sistema o entrenar nuevos modelos predictivos.
                </li>
                <li>
                  <strong>Tiempo de conservación:</strong> Los datos se
                  conservarán mientras el usuario mantenga una cuenta activa en
                  la aplicación.
                </li>
              </ul>
              <p>
                Al aceptar este consentimiento, usted brinda autorización libre,
                previa, informada e inequívoca para el tratamiento de sus datos
                personales según los términos descritos.
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
              >
                Cerrar
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
