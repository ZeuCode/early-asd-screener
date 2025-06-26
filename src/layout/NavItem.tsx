// src\layout\NavItem.tsx
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
      className={`flex flex-col items-center text-xs transition ${
        isActive ? "text-green-600" : "text-gray-500 hover:text-green-600"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );
}
