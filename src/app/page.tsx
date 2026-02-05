"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para obtener las tareas desde Supabase
  const fetchTasks = async () => {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("inserted_at", { ascending: false });

    if (!error) {
      setTasks(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-24">
      <div className="max-w-2xl mx-auto space-y-12">
        
        {/* Encabezado */}
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mis Tareas</h1>
          <p className="text-gray-400">
            Gestiona tus pendientes y registra tu actividad diaria.
          </p>
        </header>

        {/* Sección de entrada */}
        <section>
          <TaskInput onTaskAdded={fetchTasks} />
        </section>

        {/* Sección de lista */}
        <section>
          {loading ? (
            <p className="text-center text-gray-500 italic">Cargando tus tareas...</p>
          ) : (
            <TaskList tasks={tasks} refresh={fetchTasks} />
          )}
        </section>

      </div>
    </main>
  );
}