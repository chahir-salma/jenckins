import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders To Do List title', () => {
  render(<App />);
  const titleElement = screen.getByText(/To Do List/i);
  expect(titleElement).toBeInTheDocument();
});

test('allows users to add a todo item', () => {
  render(<App />);
  
  // Simulate user entering a todo
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'New Todo' } });
  
  // Simulate clicking the Add button
  const addButton = screen.getByText(/Add/i);
  fireEvent.click(addButton);
  
  // Check if the new todo is displayed
  const todoItem = screen.getByText(/New Todo/i);
  expect(todoItem).toBeInTheDocument();
});

test('allows users to delete a todo item', () => {
  render(<App />);
  
  // Add a todo first
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Todo to delete' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  // Delete the todo
  const deleteButton = screen.getByLabelText(/Delete Todo to delete/i);
  fireEvent.click(deleteButton);
  
  // Check if it has been removed
  const deletedTodo = screen.queryByText(/Todo to delete/i);
  expect(deletedTodo).not.toBeInTheDocument();
});
