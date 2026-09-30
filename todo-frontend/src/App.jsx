import { useState, useEffect } from "react";
import "./App.css";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ===== LOAD TODOS FROM BACKEND =====
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Could not load todos. Is the backend running?");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== ADD =====
  const addTodo = async () => {
    if (inputValue.trim() === "") return;

    try {
      const newTodo = await createTodo(inputValue);
      setTodos([...todos, newTodo]);
      setInputValue("");
    } catch (err) {
      setError("Failed to add todo");
      console.error(err);
    }
  };

  // ===== TOGGLE =====
  const toggleTodo = async (id, currentStatus) => {
    try {
      const updated = await updateTodo(id, { completed: !currentStatus });
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  // ===== EDIT =====
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const saveEdit = async () => {
    if (editValue.trim() === "") return;

    try {
      const updated = await updateTodo(editingId, { title: editValue });
      setTodos(todos.map((t) => (t.id === editingId ? updated : t)));
      setEditingId(null);
      setEditValue("");
    } catch (err) {
      setError("Failed to save edit");
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTodo();
  };

  // ===== RENDER =====
  return (
    <div className="app">
      <h1>📝 My Todo App</h1>

      {error && <p className="error">{error}</p>}

      <div className="input-section">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={addTodo}>+ Add</button>
      </div>

      {loading ? (
        <p className="empty-state">Loading todos...</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleEditKeyPress}
                  autoFocus
                />
              ) : (
                <span className="todo-title">{todo.title}</span>
              )}

              {editingId === todo.id ? (
                <>
                  <button className="save-btn" onClick={saveEdit}>
                    💾
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => startEdit(todo)}>
                    ✏️
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(todo.id)}
                  >
                    ✕
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && todos.length === 0 && (
        <p className="empty-state">No todos yet. Add one above! 👆</p>
      )}
    </div>
  );
}

export default App;
