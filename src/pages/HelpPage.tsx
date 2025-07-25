// src/pages/HelpPage.tsx
import {
  HelpCircle,
  FileText,
  Info,
  UserPlus,
  Brain,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

export default function HelpPage() {
  return (
    <div className="h-full bg-gray-50 p-6 md:p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 space-y-12">
        <h1 className="text-3xl font-bold text-green-800 text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8" /> Centro de Ayuda
        </h1>

        {/* Sección: Guía rápida */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Guía rápida para completar la evaluación
            </h2>
          </div>

          <ol className="list-decimal list-inside text-gray-800 space-y-4 text-base leading-relaxed bg-blue-50 border border-blue-100 rounded-xl p-6">
            <li>
              <strong>Registra a tu hijo o hija</strong> en la sección “Hijos”.
            </li>
            <li>
              <strong>Inicia una nueva evaluación</strong> haciendo click en el
              botón "Inciar Evaluación"
            </li>
            <li>
              <strong>Lee cada pregunta con calma</strong> y responde de forma
              honesta.
            </li>
            <li>
              <strong>Revisa tus respuestas antes de enviar</strong>.
            </li>
            <li>
              <strong>Visualiza el resultado</strong> y lee las recomendaciones.
            </li>
          </ol>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600 space-y-2 px-2">
            <p>
              ⏱️ <strong>Tiempo estimado:</strong> 3 a 5 minutos.
            </p>
            <p>
              🔐 <strong>Privacidad:</strong> Toda la información es
              confidencial.
            </p>
            <p>
              ⚠️ <strong>Importante:</strong> Esta evaluación{" "}
              <u>no reemplaza</u> un diagnóstico médico.
            </p>
          </div>
        </section>

        {/* Sección: Preguntas frecuentes */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            <FaqItem
              icon={<Brain className="text-indigo-600" />}
              question="¿Qué es el cuestionario Q-CHAT-10?"
              answer="Es una herramienta científica de detección temprana que busca identificar posibles señales de autismo en niños pequeños, a través de 10 preguntas sencillas para padres o cuidadores."
            />
            <FaqItem
              icon={<AlertTriangle className="text-orange-500" />}
              question="¿Este test reemplaza un diagnóstico médico?"
              answer="No. Early ASD Screener es una guía orientativa basada en inteligencia artificial, pero no sustituye la evaluación clínica de un especialista."
            />
            <FaqItem
              icon={<UserPlus className="text-green-600" />}
              question="¿Por qué necesito registrar a mi hijo o hija?"
              answer="Para que cada evaluación esté correctamente asociada a un menor específico, lo cual permite hacer seguimiento en el tiempo si decides usar la app varias veces."
            />
            <FaqItem
              icon={<ShieldCheck className="text-cyan-600" />}
              question="¿Qué tan segura es mi información?"
              answer="Toda la información está protegida y almacenada cumpliendo normativas locales de protección de datos (Ley N° 29733 - Perú). No se comparte con terceros."
            />
            <FaqItem
              icon={<HelpCircle className="text-pink-600" />}
              question="¿Qué es Early ASD Screener y para qué sirve?"
              answer="Es una aplicación digital diseñada para ayudar a padres de familia a identificar de manera rápida posibles signos tempranos de autismo en niños pequeños, brindando una orientación inicial con ayuda de tecnología predictiva."
            />
          </div>
        </section>
      </div>
    </div>
  );
}

// Componente reutilizable para ítems FAQ
function FaqItem({
  icon,
  question,
  answer,
}: {
  icon: React.ReactNode;
  question: string;
  answer: string;
}) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800">{question}</p>
        <p className="text-gray-600 text-sm mt-1">{answer}</p>
      </div>
    </div>
  );
}
