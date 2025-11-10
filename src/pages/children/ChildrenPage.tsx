// src\pages\ChildrenPage.tsx
import ChildList from "@/components/child/ChildList";

export default function ChildrenPage() {
  return (
    <div className="h-full bg-gray-100 dark:bg-gray-950 p-6 transition-colors duration-300">
      <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
        Tus hijos registrados
      </h1>
      <ChildList />
    </div>
  );
}
