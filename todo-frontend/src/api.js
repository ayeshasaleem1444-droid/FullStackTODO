const API_URL = "https://fullstacktodoweb.onrender.com";

// Get all todos
export const fetchTodos = async () => {
  const response = await fetch(`${API_URL}/todos/`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
};

// Create a new todo
export const createTodo = async (title) => {
  const response = await fetch(`${API_URL}/todos/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to create todo");
  return response.json();
};

// Update a todo (toggle completed OR edit title)
export const updateTodo = async (id, updates) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
};

// Delete a todo
export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
};
