import { useRef, useState } from "react";
import "./App.css";

function App() {
  // State to hold the list of todos
  const [todos, setTodos] = useState([]);

  const inputRef = useRef();

  // Function to add a new todo item
  const handleAddTodo = () => {
    const text = inputRef.current.value; // Get the value from the input field
    const newItem = { completed: false, text }; // Create a new todo object
    setTodos([...todos, newItem]); // Update the state with the new todo
    inputRef.current.value = ""; // Clear the input field
  };

  // Function to toggle the completion state of a todo item
  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed; // Toggle completion
    setTodos(newTodos); // Update the state with the modified todos
  };

  // Function to delete a todo item by its index
  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); // Remove the todo item from the array
    setTodos(newTodos); // Update the state with the modified array
  };

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className="item">
                <li
                  key={index}
                  className={completed ? "done" : ""} // Apply class based on completion state
                  onClick={() => handleItemDone(index)} // Mark item as done or undone
                >
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
  );
}

export default App;
