"use client";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Circle } from "lucide-react";

export default function TaskList({
  tasks,
  refresh,
}: {
  tasks: any[];
  refresh: () => void;
}) {
  const toggleTask = async (id: string, completed: boolean) => {
    const { error } = await supabase
      .from("tasks")
      .update({
        is_completed: !completed,
        completed_at: !completed ? new Date().toISOString() : null,
      })
      .eq("id", id);

    if (!error) refresh();
  };

  return (
    <div className="grid gap-3 w-full max-w-2xl mx-auto mt-8">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => toggleTask(task.id, task.is_completed)}
          className="flex items-center justify-between p-4 bg-[#0d1117] border border-[#30363d] rounded-xl cursor-pointer hover:border-gray-500 transition-all group"
        >
          <span
            className={`flex-1 ${task.is_completed ? "line-through text-gray-500" : "text-gray-200"}`}
          >
            {task.title}
          </span>
          {task.is_completed ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <Circle className="text-gray-600 group-hover:text-gray-400" />
          )}
        </div>
      ))}
    </div>
  );
}
