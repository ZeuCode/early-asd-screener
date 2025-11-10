// src\pages\policy\PrivacyPolicyPage.tsx
// src/pages/PrivacyPolicyPage.tsx
import { FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/20 p-6 md:p-10 space-y-6 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
          <FileText className="w-7 h-7" />
          Política de Privacidad
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-justify">
          En cumplimiento de la Ley N° 29733 – Ley de Protección de Datos
          Personales del Perú, informamos a los usuarios de esta aplicación que:
        </p>

        <ul className="list-disc pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            <strong>Responsable del tratamiento:</strong> Esta aplicación ha
            sido desarrollada con fines educativos para la detección temprana de
            posibles señales de autismo.
          </li>
          <li>
            <strong>Datos recolectados:</strong> Nombre, correo electrónico,
            información de los hijos (nombre, fecha de nacimiento, género,
            antecedentes) y respuestas a los cuestionarios.
          </li>
          <li>
            <strong>Finalidad:</strong> Analizar respuestas mediante
            inteligencia artificial, generar recomendaciones y monitorear
            cambios a lo largo del tiempo.
          </li>
          <li>
            <strong>Confidencialidad:</strong> Los datos se almacenan de forma
            segura y no se comparten con terceros.
          </li>
          <li>
            <strong>Derechos:</strong> El usuario puede solicitar la eliminación
            de sus datos en cualquier momento desde su perfil. (Eliminación de
            la cuenta)
          </li>
          <li>
            <strong>Conservación:</strong> Los datos se almacenan mientras el
            usuario mantenga una cuenta activa.
          </li>
          <li>
            <strong>Modificaciones:</strong> Cualquier cambio en esta política
            será comunicado a través de la aplicación.
          </li>
        </ul>

        {/* 
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Para consultas o solicitudes relacionadas con sus datos personales,
          puede escribir a: <strong>micorreo@example.com</strong>
        </p> 
        */}
      </div>
    </div>
  );
}
