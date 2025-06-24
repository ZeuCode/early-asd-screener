import ChildList from "@/components/child/ChildList";

export default function ChildrenPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-700">
        Tus hijos registrados
      </h1>
      <ChildList />
    </div>
  );
}
