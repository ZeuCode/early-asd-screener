import type { Child } from "@/types/child";
import { getAgeInMonths } from "@/utils/getAgeInMonths";

export default function ChildCard({ child }: { child: Child }) {
  const ageInMonths = getAgeInMonths(new Date(child.birth_date));

  return (
    <div className="border p-4 rounded-2xl shadow-md bg-white hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-blue-800">{child.full_name}</h2>
      <p className="text-gray-600">Edad: {ageInMonths} meses</p>
      <p className="text-gray-600">Género: {child.gender.name}</p>
      <p className="text-gray-600">
        Antecedentes TEA: {child.family_asd ? "Sí" : "No"}
      </p>
    </div>
  );
}
