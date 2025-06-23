/* // src/components/test/Qchat10Test.tsx

import React, { useState } from "react";

type Question = {
  id: string;
  text: string;
};

const questions: Question[] = [
  {
    id: "A1",
    text: "¿Tu hijo/a mira a otras personas directamente a los ojos?",
  },
  { id: "A2", text: "¿Tu hijo/a muestra interés por otros niños?" },
  { id: "A3", text: "¿Tu hijo/a señala objetos para compartir su interés?" },
  { id: "A4", text: "¿Tu hijo/a responde cuando lo llamas por su nombre?" },
  { id: "A5", text: "¿Tu hijo/a juega de forma imaginativa o simbólica?" },
  { id: "A6", text: "¿Tu hijo/a muestra gestos como saludar o despedirse?" },
  { id: "A7", text: "¿Tu hijo/a te imita cuando haces movimientos o sonidos?" },
  { id: "A8", text: "¿Tu hijo/a te sigue con la mirada cuando señalas algo?" },
  { id: "A9", text: "¿Tu hijo/a sonríe en respuesta a tu sonrisa?" },
  { id: "A10", text: "¿Tu hijo/a reacciona cuando ve emociones en tu rostro?" },
];

const Qchat10Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1)); // Inicializamos con -1
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [familyHistory, setFamilyHistory] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = value;
    setAnswers(newAnswers);
    setError(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const allQuestionsAnswered = () => answers.every((a) => a !== -1);

  const handleSubmit = async () => {
    if (
      !allQuestionsAnswered() ||
      age === null ||
      gender === null ||
      familyHistory === null
    ) {
      setError("Por favor completa todas las respuestas y campos adicionales.");
      return;
    }

    const payload = {
      data: [...answers, age, gender, familyHistory],
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data.interpretation || data.prediction);
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  if (result) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-bold">Resultado:</h2>
        <p className="mt-2">{result}</p>
      </div>
    );
  }

  if (currentIndex < questions.length) {
    const q = questions[currentIndex];
    return (
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">{q.text}</h2>
        <div className="flex gap-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleAnswer(1)}
          >
            Sí
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleAnswer(0)}
          >
            No
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Datos adicionales</h2>
      <div className="space-y-2">
        <div>
          <label>Edad en meses:</label>
          <input
            type="number"
            className="border p-2 ml-2"
            value={age ?? ""}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Género:</label>
          <select
            className="ml-2 p-2"
            onChange={(e) => setGender(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Femenino</option>
            <option value={0}>Masculino</option>
          </select>
        </div>
        <div>
          <label>¿Familiar con TEA?:</label>
          <select
            className="ml-2 p-2"
            onChange={(e) => setFamilyHistory(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
      </div>

      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Enviar respuestas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Qchat10Test;
 */

/* 
import React, { useState } from "react";

type Question = {
  id: string;
  text: string;
};

const questions: Question[] = [
  {
    id: "A1",
    text: "¿Tu hijo/a mira a otras personas directamente a los ojos?",
  },
  { id: "A2", text: "¿Tu hijo/a muestra interés por otros niños?" },
  { id: "A3", text: "¿Tu hijo/a señala objetos para compartir su interés?" },
  { id: "A4", text: "¿Tu hijo/a responde cuando lo llamas por su nombre?" },
  { id: "A5", text: "¿Tu hijo/a juega de forma imaginativa o simbólica?" },
  { id: "A6", text: "¿Tu hijo/a muestra gestos como saludar o despedirse?" },
  { id: "A7", text: "¿Tu hijo/a te imita cuando haces movimientos o sonidos?" },
  { id: "A8", text: "¿Tu hijo/a te sigue con la mirada cuando señalas algo?" },
  { id: "A9", text: "¿Tu hijo/a sonríe en respuesta a tu sonrisa?" },
  { id: "A10", text: "¿Tu hijo/a reacciona cuando ve emociones en tu rostro?" },
];

const Qchat10Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [familyHistory, setFamilyHistory] = useState<number | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = value;
    setAnswers(updatedAnswers);
    setError(null);

    setCurrentIndex((prev) => prev + 1); // Avanza a siguiente pregunta o campos extra
  };

  const allQuestionsAnswered = () => answers.every((a) => a !== -1);

  const handleSubmit = async () => {
    if (
      !allQuestionsAnswered() ||
      age === null ||
      gender === null ||
      familyHistory === null
    ) {
      setError("Por favor completa todas las respuestas y campos adicionales.");
      return;
    }

    const payload = {
      data: [...answers, age, gender, familyHistory],
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data.interpretation || data.prediction);
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  // ✅ Mostrar resultado final si existe
  if (result) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Resultado del modelo:</h2>
        <p className="text-lg">{result}</p>
      </div>
    );
  }

  // ✅ Mostrar preguntas una por una
  if (currentIndex < questions.length) {
    const q = questions[currentIndex];
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-lg font-semibold mb-6">{q.text}</h2>
        <div className="flex gap-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded text-lg"
            onClick={() => handleAnswer(1)}
          >
            Sí
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded text-lg"
            onClick={() => handleAnswer(0)}
          >
            No
          </button>
        </div>
        {error && <p className="text-red-500 mt-6">{error}</p>}
      </div>
    );
  }

  // ✅ Mostrar campos adicionales al final
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Datos adicionales</h2>
      <div className="space-y-4 text-left">
        <div>
          <label className="block mb-1">Edad en meses:</label>
          <input
            type="number"
            className="w-full border p-2"
            value={age ?? ""}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block mb-1">Género:</label>
          <select
            className="w-full border p-2"
            onChange={(e) => setGender(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Femenino</option>
            <option value={0}>Masculino</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">¿Familiar con TEA?:</label>
          <select
            className="w-full border p-2"
            onChange={(e) => setFamilyHistory(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
      </div>

      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded text-lg"
        onClick={handleSubmit}
      >
        Enviar respuestas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Qchat10Test;
 */

import { useState } from "react";

type Question = {
  id: string;
  text: string;
};

const questions: Question[] = [
  {
    id: "A1",
    text: "¿Su niño/a lo/a mira a usted cuando lo llama por su nombre?",
  },
  {
    id: "A2",
    text: "¿Su niño/a sigue su mirada hacia donde usted está mirando?",
  },
  {
    id: "A3",
    text: "Su niño/a le mira espontáneamente a la cara para ver su reacción, cuando ocurre algo que no es habitual",
  },
  {
    id: "A4",
    text: "Si usted o alguien en su familia está visiblemente angustiado o triste,¿Su niño/a muestra signos de querer ayudarlo?. Por ejemplo,acariciando su pelo o abrazándolo",
  },
  {
    id: "A5",
    text: "¿Su niño/a utiliza gestos simples?. Por ejemplo, cuando se despide,¿hace como “chao”?",
  },
  {
    id: "A6",
    text: "¿Que tan fácil es para usted tener contacto visual con su niño/a?. Por ejemplo, que el/ella le mire.",
  },
  {
    id: "A7",
    text: "¿Su niño/a apunta con el dedo cuando quiere algo? Por ejemplo, un juguete que está fuera de su alcance ",
  },
  {
    id: "A8",
    text: "¿Su niño/a juega a simular?. Por ejemplo, hacer “como si” cuidara su muñeca o “como si” hablara por un teléfono de juguete",
  },
  {
    id: "A9",
    text: "¿Su niño/a apunta con el dedo para mostrarle algo que le interesa? Por ejemplo, apunta para mostrarle o compartir algo interesante",
  },
  {
    id: "A10",
    text: "¿Tu niño/a mira a la nada, como sin propósito aparente?. Por ejemplo, mirando un punto fijo",
  },
];

const Qchat10Test = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(10).fill(-1));
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [familyHistory, setFamilyHistory] = useState<number | null>(null);
  const [result, setResult] = useState<{
    prediction: number;
    probability: number;
    risk_level: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = value;
    setAnswers(updatedAnswers);
    setError(null);
    setCurrentIndex((prev) => prev + 1);
  };

  const allQuestionsAnswered = () => answers.every((a) => a !== -1);

  const handleSubmit = async () => {
    if (
      !allQuestionsAnswered() ||
      age === null ||
      gender === null ||
      familyHistory === null
    ) {
      setError("Por favor completa todas las respuestas y campos adicionales.");
      return;
    }

    const payload = {
      data: [...answers, age, gender, familyHistory],
    };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  if (result) {
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold mb-4">Resultado del modelo:</h2>
        <p className="text-lg">
          <strong>Predicción:</strong>{" "}
          {result.prediction === 1 ? "Positivo (riesgo)" : "Negativo"}
        </p>
        <p className="text-lg mt-2">
          <strong>Probabilidad:</strong> {(result.probability * 100).toFixed(1)}
          %
        </p>
        <p className="text-lg mt-2">
          <strong>Nivel de riesgo:</strong> {result.risk_level}
        </p>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => window.location.reload()}
        >
          Volver a empezar
        </button>
      </div>
    );
  }

  if (currentIndex < questions.length) {
    const q = questions[currentIndex];
    return (
      <div className="p-4 flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-lg font-semibold mb-6">{q.text}</h2>
        <div className="flex gap-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded text-lg"
            onClick={() => handleAnswer(1)}
          >
            Sí
          </button>
          <button
            className="bg-red-600 text-white px-6 py-2 rounded text-lg"
            onClick={() => handleAnswer(0)}
          >
            No
          </button>
        </div>
        {error && <p className="text-red-500 mt-6">{error}</p>}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold mb-4">Datos adicionales</h2>
      <div className="space-y-4 text-left">
        <div>
          <label className="block mb-1">Edad en meses:</label>
          <input
            type="number"
            className="w-full border p-2"
            value={age ?? ""}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block mb-1">Género:</label>
          <select
            className="w-full border p-2"
            onChange={(e) => setGender(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Femenino</option>
            <option value={0}>Masculino</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">¿Familiar con TEA?:</label>
          <select
            className="w-full border p-2"
            onChange={(e) => setFamilyHistory(Number(e.target.value))}
          >
            <option value="">Seleccione</option>
            <option value={1}>Sí</option>
            <option value={0}>No</option>
          </select>
        </div>
      </div>

      <button
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded text-lg"
        onClick={handleSubmit}
      >
        Enviar respuestas
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Qchat10Test;
