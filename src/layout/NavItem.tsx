// src/layout/NavItem.tsx
import { useNavigate } from "react-router";

type NavItemProps = {
  label: string;
  icon: React.ElementType;
  path: string;
  currentPath: string;
};

export default function NavItem({
  label,
  icon: Icon,
  path,
  currentPath,
}: NavItemProps) {
  const navigate = useNavigate();
  const isActive = currentPath === path;

  return (
    <button
      onClick={() => navigate(path)}
      className={`flex flex-col items-center text-xs transition-colors duration-200
        ${
          isActive
            ? "text-green-600 dark:text-green-400"
            : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
        }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
