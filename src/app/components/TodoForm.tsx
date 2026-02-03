// Función para insertar en Supabase
const addTask = async (title: string) => {
  await supabase.from("tasks").insert([{ title, user_id: user.id }]);
};

const toggleComplete = async (id: string) => {
  await supabase
    .from("tasks")
    .update({ is_completed: true, completed_at: new Date().toISOString() })
    .eq("id", id);
};
