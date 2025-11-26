import {
  HelpCircle,
  FileText,
  Info,
  UserPlus,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Mail,
  ArrowLeft,
  X,
  BarChart,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function HelpPage() {
  const [category, setCategory] = useState<
    "general" | "cuenta" | "privacidad" | "evaluacion"
  >("general");
  const [search, setSearch] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSendFeedback = () => {
    globalThis.location.href = `mailto:earlyasdscreener@gmail.com?subject=Retroalimentación%20de%20usuario&body=${encodeURIComponent(
      feedback
    )}`;
    setShowFeedback(false);
    setFeedback("");
  };

  const faqs = [
    {
      category: "general",
      icon: <Brain className="text-indigo-600" />,
      question: "¿Qué es el cuestionario Q-CHAT-10?",
      answer:
        "El Q-CHAT-10 es un cuestionario de detección temprana de autismo para niños pequeños. Consta de 10 preguntas que los padres o cuidadores responden según las conductas del menor.",
    },
    {
      category: "evaluacion",
      icon: <FileText className="text-blue-600" />,
      question: "¿Cómo se llena el Q-CHAT-10?",
      answer:
        "Cada pregunta ofrece opciones de frecuencia o comportamiento. Se debe seleccionar la que mejor describa al niño o niña. No hay respuestas correctas o incorrectas: la sinceridad es clave para una estimación precisa.",
    },
    {
      category: "evaluacion",
      icon: <BarChart className="text-amber-500" />,
      question: "¿Cómo funciona la estimación de riesgo?",
      answer:
        "El sistema asigna un puntaje a las respuestas y, mediante un modelo predictivo, clasifica el riesgo como bajo, medio o alto. Esto orienta a los padres sobre la necesidad de consultar con un especialista.",
    },
    {
      category: "evaluacion",
      icon: <Lightbulb className="text-yellow-400" />,
      question: "¿Qué debo hacer si el resultado indica riesgo alto?",
      answer:
        "Un puntaje alto no significa un diagnóstico, pero sugiere la conveniencia de una evaluación profesional. El resultado solo orienta; la confirmación debe realizarla un pediatra o psicólogo especializado.",
    },
    {
      category: "cuenta",
      icon: <UserPlus className="text-green-600" />,
      question: "¿Por qué necesito registrar a mi hijo o hija?",
      answer:
        "Para que cada evaluación se asocie correctamente a un menor y puedas revisar su historial o evolución en futuras pruebas.",
    },
    {
      category: "privacidad",
      icon: <ShieldCheck className="text-cyan-600" />,
      question: "¿Cómo protege Early ASD Screener mi información?",
      answer:
        "Tus datos se cifran y almacenan cumpliendo la Ley N° 29733 (Protección de Datos Personales - Perú). No se comparten con terceros.",
    },
    {
      category: "general",
      icon: <AlertTriangle className="text-orange-500" />,
      question: "¿Early ASD Screener reemplaza un diagnóstico médico?",
      answer:
        "No. Es una guía orientativa que ayuda a detectar señales tempranas, pero el diagnóstico final debe hacerlo un profesional de la salud.",
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.category === category &&
      (f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
            <HelpCircle className="w-8 h-8" /> Centro de Ayuda
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { id: "general", label: "General" },
            { id: "evaluacion", label: "Evaluación" },
            { id: "cuenta", label: "Cuenta" },
            { id: "privacidad", label: "Privacidad" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                category === cat.id
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="text-center">
          <input
            type="text"
            placeholder="Buscar en preguntas frecuentes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Info className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-6">
            {filteredFaqs.length > 0 ? (
              // SOLUCIÓN: Usamos faq.question como key única en lugar del índice
              filteredFaqs.map((faq) => <FaqItem key={faq.question} {...faq} />)
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No se encontraron resultados para “{search}”.
              </p>
            )}
          </div>
        </section>

        {/* Soporte y Feedback */}
        <section className="text-center space-y-2 pt-6 border-t dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href="mailto:earlyasdscreener@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm transition"
          >
            <Mail className="w-4 h-4" /> Contactar soporte técnico
          </a>
          <div>
            <button
              onClick={() => setShowFeedback(true)}
              className="text-sm underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Enviar retroalimentación
            </button>
          </div>
        </section>
      </div>

      {/* Modal de retroalimentación */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-11/12 md:w-1/2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Enviar retroalimentación
              </h2>
              <button
                onClick={() => setShowFeedback(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Escribe tus comentarios, sugerencias o problemas..."
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowFeedback(false)}
                className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendFeedback}
                disabled={!feedback.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FaqItem({
  icon,
  question,
  answer,
}: Readonly<{
  icon: React.ReactNode;
  question: string;
  answer: string;
}>) {
  return (
    <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
      <div className="shrink-0 mt-1">{icon}</div>
      <div>
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          {question}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {answer}
        </p>
      </div>
    </div>
  );
}
