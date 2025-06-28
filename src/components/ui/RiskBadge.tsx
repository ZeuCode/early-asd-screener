// src\components\ui\RiskBadge.tsx
// src/components/ui/RiskBadge.tsx
import { getRiskStyle, type RiskLevel } from "@/utils/riskLevel";

type RiskBadgeProps = {
  level: RiskLevel;
};

export default function RiskBadge({ level }: RiskBadgeProps) {
  const style = getRiskStyle(level);

  return (
    <span
      className={`inline-block px-5 py-2 rounded-full text-lg font-bold shadow-sm ring-2 ${style.bg} ${style.text} ${style.ring}`}
    >
      {level}
    </span>
  );
}
