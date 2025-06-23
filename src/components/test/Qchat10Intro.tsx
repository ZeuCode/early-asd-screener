// src/components/test/Qchat10Intro.tsx

import { useNavigate } from "react-router";

const Qchat10Intro = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/qchat10/test"); // Asegúrate que esta ruta esté definida en tus rutas
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Q-CHAT-10</h1>
      <p className="mb-4">
        Este cuestionario contiene 10 preguntas diseñadas para ayudar a
        identificar señales tempranas del Trastorno del Espectro Autista (TEA)
        en niños pequeños. No es un diagnóstico, sino una herramienta de
        tamizaje (screening).
      </p>
      <p className="mb-6">
        Responde con sinceridad y según el comportamiento habitual del niño/a.
        Al finalizar, obtendrás un resultado indicativo del nivel de riesgo.
      </p>
      <button
        onClick={handleStart}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Comenzar cuestionario
      </button>
    </div>
  );
};

export default Qchat10Intro;
