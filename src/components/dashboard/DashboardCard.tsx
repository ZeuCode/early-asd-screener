import { type ReactNode } from "react";

interface DashboardCardProps {
  label: string;
  children?: ReactNode;
}

export default function DashboardCard({
  label,
  children,
}: Readonly<DashboardCardProps>) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{label}</p>
      {children}
    </div>
  );
}
