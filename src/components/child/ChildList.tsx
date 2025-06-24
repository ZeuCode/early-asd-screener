//src/components/ChildList.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";

import ChildCard from "./ChildCard";
import { useToast } from "@/context/ToastContext";
import type { Child } from "@/types/child";

export default function ChildList() {
  const [children, setChildren] = useState<Child[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get("/children/");
        setChildren(res.data);
      } catch (error) {
        console.error(error);
        showToast("Error al cargar los hijos registrados.", "error");
      }
    };

    fetchChildren();
  }, [showToast]);

  if (children.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-4">
        No tienes hijos registrados.
      </p>
    );
  }

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children.map((child) => (
        <ChildCard key={child.id} child={child} />
      ))}
    </div>
  );
}
