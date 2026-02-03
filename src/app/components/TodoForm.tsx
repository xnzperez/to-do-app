// Función para insertar en Supabase
const addTask = async (title: string) => {
  await supabase.from("tasks").insert([{ title, user_id: user.id }]);
};
