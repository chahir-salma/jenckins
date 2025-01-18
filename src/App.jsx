import { useRef, useState } from "react";
import "./App.css";

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();

  // Function to add a new todo item
  const handleAddTodo = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
  };

  // Function to toggle the completion state of a todo item
  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // Function to delete a todo item by its index
  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="background">
      <h1 className="title">To Do List for DevOps Test</h1>
      <div className="App">
        <h2>To Do List</h2>
        <div className="to-do-container">
          <ul>
            {todos.map(({ text, completed }, index) => {
              return (
                <div className="item">
                  <li
                    key={index}
                    className={completed ? "done" : ""}
                    onClick={() => handleItemDone(index)}>
                    {text}
                  </li>
                  <span onClick={() => handleDeleteItem(index)} className="trash">❌</span>
                </div>
              );
            })}
          </ul>
          <input ref={inputRef} placeholder="Enter item..." />
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
