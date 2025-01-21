import { useRef, useState } from "react";
import "./App.css";

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();

  // Function to add a new item
  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newItem = { id: Date.now(), completed: false, text }; // Use Date.now() for a unique ID
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  // Function to toggle the completion state of an item
  const handleItemDone = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Function to delete an item by its ID
  const handleDeleteItem = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="background">
      <h1 className="title">Pipline Its works with couvrage</h1>
      <div className="App">
        <h2>To Do List</h2>
        <p>{todos.length}</p>
        <div className="to-do-container">
          <ul>
            {todos.map(({ id, text, completed }) => (
              <li key={id} className={completed ? "done" : ""}>
                {/* Button for toggling completion state */}
                <button
                  onClick={() => handleItemDone(id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleItemDone(id)}
                  aria-pressed={completed}
                >
                  {text}
                </button>
                {/* Button for deleting the item */}
                <button
                  onClick={() => handleDeleteItem(id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleDeleteItem(id)}
                  aria-label={`Delete ${text}`}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <input ref={inputRef} placeholder="Enter item..." />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
