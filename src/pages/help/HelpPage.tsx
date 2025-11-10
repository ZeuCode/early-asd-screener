// src\pages\help\HelpPage.tsx
// // src/pages/HelpPage.tsx
// import {
//   HelpCircle,
//   FileText,
//   Info,
//   UserPlus,
//   Brain,
//   ShieldCheck,
//   AlertTriangle,
// } from "lucide-react";
// import { Link } from "react-router";

// export default function HelpPage() {
//   return (
//     <div className="h-full bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 space-y-12">
//         <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 text-center flex items-center justify-center gap-2">
//           <HelpCircle className="w-8 h-8" /> Centro de Ayuda
//         </h1>

//         {/* Sección: Guía rápida */}
//         <section>
//           <div className="flex items-center gap-2 mb-4">
//             <FileText className="text-blue-600" />
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//               Guía rápida para completar la evaluación
//             </h2>
//           </div>

//           <ol className="list-decimal list-inside text-gray-800 dark:text-gray-100 space-y-4 text-base leading-relaxed bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-xl p-6">
//             <li>
//               <strong>Registra a tu hijo o hija</strong> en la sección “Hijos”.
//             </li>
//             <li>
//               <strong>Inicia una nueva evaluación</strong> haciendo click en el
//               botón "Inciar Evaluación"
//             </li>
//             <li>
//               <strong>Lee cada pregunta con calma</strong> y responde de forma
//               honesta.
//             </li>
//             <li>
//               <strong>Revisa tus respuestas antes de enviar</strong>.
//             </li>
//             <li>
//               <strong>Visualiza el resultado</strong> y lee las recomendaciones.
//             </li>
//           </ol>

//           <div className="mt-6 border-t pt-4 text-sm text-gray-600 dark:text-gray-400 dark:border-gray-700 space-y-2 px-2">
//             <p>
//               ⏱️ <strong>Tiempo estimado:</strong> 3 a 5 minutos.
//             </p>
//             <p>
//               🔐 <strong>Privacidad:</strong> Toda la información es
//               confidencial.
//             </p>
//             <p>
//               ⚠️ <strong>Importante:</strong> Esta evaluación{" "}
//               <u>no reemplaza</u> un diagnóstico médico.
//             </p>
//           </div>
//         </section>

//         {/* Sección: Preguntas frecuentes */}
//         <section>
//           <div className="flex items-center gap-2 mb-4">
//             <Info className="text-purple-600 dark:text-purple-400" />
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//               Preguntas frecuentes
//             </h2>
//           </div>

//           <div className="space-y-6">
//             <FaqItem
//               icon={<Brain className="text-indigo-600" />}
//               question="¿Qué es el cuestionario Q-CHAT-10?"
//               answer="Es una herramienta de tamizaje para la detección temprana que busca identificar posibles señales de autismo en niños pequeños, mediante 10 preguntas sencillas para padres o cuidadores."
//             />
//             <FaqItem
//               icon={<AlertTriangle className="text-orange-500" />}
//               question="¿Este test reemplaza un diagnóstico médico?"
//               answer="No. Early ASD Screener es una guía orientativa basada en inteligencia artificial, pero no sustituye la evaluación clínica de un especialista."
//             />
//             <FaqItem
//               icon={<UserPlus className="text-green-600" />}
//               question="¿Por qué necesito registrar a mi hijo o hija?"
//               answer="Para que cada evaluación esté correctamente asociada a un menor específico, lo cual permite hacer seguimiento en el tiempo si decides usar la app varias veces."
//             />
//             <FaqItem
//               icon={<ShieldCheck className="text-cyan-600" />}
//               question="¿Qué tan segura es mi información?"
//               answer="Toda la información está protegida y almacenada cumpliendo normativas locales de protección de datos (Ley N° 29733 - Perú). No se comparte con terceros."
//             />
//             <FaqItem
//               icon={<HelpCircle className="text-pink-600" />}
//               question="¿Qué es Early ASD Screener y para qué sirve?"
//               answer="Es una aplicación digital diseñada para ayudar a padres de familia a identificar de manera rápida posibles signos tempranos de autismo en niños pequeños, brindando una orientación inicial con ayuda de tecnología predictiva."
//             />
//           </div>
//         </section>
//         {/* Enlace a política de privacidad */}
//         <section className="text-center text-sm text-gray-600 dark:text-gray-400">
//           📄{" "}
//           <Link
//             to="/privacy-policy"
//             className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//           >
//             Ver política de privacidad
//           </Link>
//         </section>
//       </div>
//     </div>
//   );
// }

// // Componente reutilizable para ítems FAQ
// function FaqItem({
//   icon,
//   question,
//   answer,
// }: {
//   icon: React.ReactNode;
//   question: string;
//   answer: string;
// }) {
//   return (
//     <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
//       <div className="shrink-0 mt-1">{icon}</div>
//       <div>
//         <p className="font-semibold text-gray-800 dark:text-gray-100">
//           {question}
//         </p>
//         <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
//           {answer}
//         </p>
//       </div>
//     </div>
//   );
// }

// import {
//   HelpCircle,
//   FileText,
//   Info,
//   UserPlus,
//   Brain,
//   ShieldCheck,
//   AlertTriangle,
//   Mail,
//   ArrowLeft,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router";
// import { useState } from "react";

// export default function HelpPage() {
//   const [category, setCategory] = useState<"general" | "cuenta" | "privacidad">(
//     "general"
//   );
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   const faqs = [
//     {
//       category: "general",
//       icon: <Brain className="text-indigo-600" />,
//       question: "¿Qué es el cuestionario Q-CHAT-10?",
//       answer:
//         "Es una herramienta de tamizaje para la detección temprana que busca identificar posibles señales de autismo en niños pequeños.",
//     },
//     {
//       category: "general",
//       icon: <AlertTriangle className="text-orange-500" />,
//       question: "¿Este test reemplaza un diagnóstico médico?",
//       answer:
//         "No. Early ASD Screener es una guía orientativa, pero no sustituye la evaluación clínica de un especialista.",
//     },
//     {
//       category: "cuenta",
//       icon: <UserPlus className="text-green-600" />,
//       question: "¿Por qué necesito registrar a mi hijo o hija?",
//       answer:
//         "Para asociar cada evaluación a un menor específico y permitir seguimiento en el tiempo.",
//     },
//     {
//       category: "privacidad",
//       icon: <ShieldCheck className="text-cyan-600" />,
//       question: "¿Qué tan segura es mi información?",
//       answer:
//         "La información está protegida cumpliendo la Ley N° 29733 - Perú. No se comparte con terceros.",
//     },
//   ];

//   const filteredFaqs = faqs.filter(
//     (f) =>
//       f.category === category &&
//       (f.question.toLowerCase().includes(search.toLowerCase()) ||
//         f.answer.toLowerCase().includes(search.toLowerCase()))
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 space-y-10">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
//             <HelpCircle className="w-8 h-8" /> Centro de Ayuda
//           </h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600"
//           >
//             <ArrowLeft className="w-4 h-4" /> Volver
//           </button>
//         </div>

//         {/* Categorías */}
//         <div className="flex flex-wrap justify-center gap-3">
//           {[
//             { id: "general", label: "General" },
//             { id: "cuenta", label: "Cuenta" },
//             { id: "privacidad", label: "Privacidad" },
//           ].map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setCategory(cat.id as any)}
//               className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
//                 category === cat.id
//                   ? "bg-green-600 text-white border-green-600"
//                   : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-green-100 dark:hover:bg-green-800"
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>

//         {/* Buscador */}
//         <div className="text-center">
//           <input
//             type="text"
//             placeholder="Buscar en preguntas frecuentes..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full md:w-2/3 p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400"
//           />
//         </div>

//         {/* FAQ */}
//         <section>
//           <div className="flex items-center gap-2 mb-4">
//             <Info className="text-purple-600 dark:text-purple-400" />
//             <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
//               Preguntas frecuentes
//             </h2>
//           </div>

//           <div className="space-y-6">
//             {filteredFaqs.length > 0 ? (
//               filteredFaqs.map((faq, i) => <FaqItem key={i} {...faq} />)
//             ) : (
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 No se encontraron resultados para “{search}”.
//               </p>
//             )}
//           </div>
//         </section>

//         {/* Soporte */}
//         <section className="text-center space-y-2 pt-4 border-t dark:border-gray-700">
//           <p className="text-gray-700 dark:text-gray-300">
//             ¿No encontraste lo que buscabas?
//           </p>
//           <a
//             href="mailto:soporte@earlyasd.pe"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-sm transition"
//           >
//             <Mail className="w-4 h-4" /> Contactar soporte técnico
//           </a>
//           <div>
//             <Link
//               to="/feedback"
//               className="text-sm underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
//             >
//               Enviar retroalimentación
//             </Link>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// function FaqItem({
//   icon,
//   question,
//   answer,
// }: {
//   icon: React.ReactNode;
//   question: string;
//   answer: string;
// }) {
//   return (
//     <div className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
//       <div className="shrink-0 mt-1">{icon}</div>
//       <div>
//         <p className="font-semibold text-gray-800 dark:text-gray-100">
//           {question}
//         </p>
//         <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
//           {answer}
//         </p>
//       </div>
//     </div>
//   );
// }

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
    window.location.href = `mailto:earlyasdscreener@gmail.com?subject=Retroalimentación%20de%20usuario&body=${encodeURIComponent(
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
              filteredFaqs.map((faq, i) => <FaqItem key={i} {...faq} />)
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
}: {
  icon: React.ReactNode;
  question: string;
  answer: string;
}) {
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
