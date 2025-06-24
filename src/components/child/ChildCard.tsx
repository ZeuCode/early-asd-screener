import type { Child } from "@/types/child";

export default function ChildCard({ child }: { child: Child }) {
  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-blue-800">{child.name}</h2>
      <p className="text-gray-600">Edad: {child.age_months} meses</p>
      <p className="text-gray-600">
        Género: {child.gender === "male" ? "Masculino" : "Femenino"}
      </p>
      <p className="text-gray-600">
        Antecedentes TEA: {child.has_family_with_asd ? "Sí" : "No"}
      </p>
    </div>
  );
}
