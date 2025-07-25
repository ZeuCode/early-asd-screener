// src/pages/FaqPage.tsx
import { faqList } from "@/data/faqData";

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-green-700">
          Preguntas Frecuentes sobre el Cuestionario
        </h1>

        {faqList.map((faq, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
