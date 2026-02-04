"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { GitBranch, Plus } from "lucide-react";

export default function CommitForm() {
  const [task, setTask] = useState("");
  const [type, setType] = useState("feat");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    // Insertamos en Supabase
    // El mensaje final será tipo: "feat: mi nueva tarea"
    const fullMessage = `${type}: ${task}`;

    const { error } = await supabase
      .from("tasks")
      .insert([{ title: fullMessage, is_completed: false }]);

    if (!error) {
      setTask("");
      alert("¡Tarea 'comiteada' con éxito! 🚀");
    }
  };

  return (
    <form
      onSubmit={handleAdd}
      className="bg-[#0d1117] border border-[#30363d] p-4 rounded-lg flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
        <GitBranch size={16} />
        <span>main</span>
      </div>

      <div className="flex gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-[#161b22] border border-[#30363d] text-gray-300 rounded px-2 py-1 outline-none focus:border-[#238636]"
        >
          <option value="feat">feat</option>
          <option value="fix">fix</option>
          <option value="docs">docs</option>
          <option value="refactor">refactor</option>
        </select>

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="¿Qué estás trabajando hoy?"
          className="flex-1 bg-[#161b22] border border-[#30363d] text-white rounded px-3 py-1 outline-none focus:border-[#238636] placeholder:text-gray-500"
        />

        <button
          type="submit"
          className="bg-[#238636] hover:bg-[#2ea043] text-white px-3 py-1 rounded flex items-center gap-1 transition-colors"
        >
          <Plus size={18} />
          <span>Commit</span>
        </button>
      </div>
    </form>
  );
}
