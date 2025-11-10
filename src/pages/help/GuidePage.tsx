// src/pages/GuidePage.tsx
export default function GuidePage() {
  return (
    <div className="h-full bg-gray-50 p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 text-green-800 text-center">
          Guía rápida para completar la evaluación Q-CHAT-10
        </h1>

        <ol className="list-decimal list-inside text-gray-800 space-y-4 text-base leading-relaxed">
          <li>
            <strong>Registra a tu hijo o hija</strong> en la sección “Mis
            hijos”. Es necesario para vincular la evaluación a su perfil.
          </li>

          <li>
            <strong>Inicia una nueva evaluación</strong> seleccionando al niño/a
            registrado. Solo toma unos minutos.
          </li>

          <li>
            <strong>Lee cada pregunta con calma</strong> y responde de forma
            honesta. No hay respuestas correctas o incorrectas.
          </li>

          <li>
            <strong>Revisa tus respuestas antes de enviar</strong>. Tendrás la
            opción de verificar todo antes de confirmar.
          </li>

          <li>
            <strong>Visualiza el resultado</strong> y lee las recomendaciones
            según el nivel de riesgo detectado.
          </li>
        </ol>

        <div className="mt-8 border-t pt-4 text-sm text-gray-600 space-y-2">
          <p>
            ⏱️ <strong>Tiempo estimado:</strong> 3 a 5 minutos.
          </p>
          <p>
            🔐 <strong>Privacidad:</strong> La información es confidencial y
            usada solo para fines de orientación.
          </p>
          <p>
            ⚠️ <strong>Importante:</strong> Esta evaluación <u>no reemplaza</u>{" "}
            un diagnóstico médico. Si tienes dudas, consulta con un
            especialista.
          </p>
        </div>
      </div>
    </div>
  );
}
