import { useState } from "react";
import "./App.css";

function App() {
  // Mock todos (will replace with API later)
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build Todo UI", completed: true },
    { id: 3, title: "Connect to API", completed: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      title: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const saveEdit = () => {
    if (editValue.trim() === "") return;
    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, title: editValue } : todo,
      ),
    );
    setEditingId(null);
    setEditValue("");
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

  return (
    <div className="app">
      <h1>📝 My Todo App</h1>

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

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />

            {editingId === todo.id ? (
              // 👇 Edit mode: show an input
              <input
                type="text"
                className="edit-input"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEditKeyPress}
                autoFocus
              />
            ) : (
              // 👇 Display mode: show the title
              <span className="todo-title">{todo.title}</span>
            )}

            {editingId === todo.id ? (
              // 👇 Edit mode: show Save and Cancel buttons
              <>
                <button className="save-btn" onClick={saveEdit}>
                  💾
                </button>
                <button className="cancel-btn" onClick={cancelEdit}>
                  ✕
                </button>
              </>
            ) : (
              // 👇 Display mode: show Edit and Delete buttons
              <>
                <button className="edit-btn" onClick={() => startEdit(todo)}>
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                >
                  ✕
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-state">No todos yet. Add one above! 👆</p>
      )}
    </div>
  );
}

export default App;
