// src\components\child\ChildList.tsx
import { useEffect, useState } from "react";
import api from "@/api/axios";
import ChildCard from "./ChildCard";
import { useToast } from "@/context/ToastContext";
import { useNavigate } from "react-router";
import type { ChildResume } from "@/types/child";
import { Button } from "../ui/Button";

export default function ChildList() {
  const [children, setChildren] = useState<ChildResume[]>([]);
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate("/children/add")}
        >
          + Registrar nuevo hijo
        </Button>
      </div>

      {children.length === 0 ? (
        <p className="text-center text-gray-600 mt-4">
          No tienes hijos registrados.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {children.map((child) => (
            <ChildCard key={child.id} child={child} />
          ))}
        </div>
      )}
    </div>
  );
}
