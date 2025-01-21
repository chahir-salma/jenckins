import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (text) {
      const newItem = { id: Date.now(), completed: false, text };
      setTodos([...todos, newItem]);
      inputRef.current.value = "";
    }
  };

  const handleItemDone = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const handleDeleteItem = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="background">
      <h1 className="title">Pipeline To-Do App</h1>
      <div className="App">
        <h2>To-Do List</h2>
        <p>Total Items: {todos.length}</p>
        <div className="to-do-container">
          <ul>
            {todos.map(({ id, text, completed }) => (
              <li key={id} className={`item ${completed ? "done" : ""}`}>
                <span>{text}</span>
                <div className="actions">
                  <button
                    className="complete-btn"
                    onClick={() => handleItemDone(id)}
                    aria-pressed={completed}
                  >
                    {completed ? "Undo" : "Done"}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteItem(id)}
                    aria-label={`Delete ${text}`}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="input-container">
            <input ref={inputRef} placeholder="Enter item..." />
            <button onClick={handleAddTodo}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
