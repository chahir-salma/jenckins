import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App.jsx';

test('renders To Do List title', () => {
  render(<App />);
  const titleElement = screen.getByText(/To Do List/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the total number of items', () => {
  render(<App />);
  const totalItems = screen.getByText(/Total Items: 0/i); // Adjusted to match updated text
  expect(totalItems).toBeInTheDocument();
});

test('allows users to add a todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const todoItem = screen.getByText(/New Todo/i);
  expect(todoItem).toBeInTheDocument();
  
  const totalItems = screen.getByText(/Total Items: 1/i); // Updated for clarity
  expect(totalItems).toBeInTheDocument();
});

test('prevents adding empty todo items', () => {
  render(<App />);
  
  fireEvent.click(screen.getByText(/Add/i));
  
  const totalItems = screen.getByText(/Total Items: 0/i); // Adjusted to match updated text
  expect(totalItems).toBeInTheDocument();
});

test('allows users to delete a todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Todo to delete' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const deleteButton = screen.getByLabelText(/Delete Todo to delete/i);
  fireEvent.click(deleteButton);
  
  const deletedTodo = screen.queryByText(/Todo to delete/i);
  expect(deletedTodo).not.toBeInTheDocument();
  
  const totalItems = screen.getByText(/Total Items: 0/i); // Adjusted to match updated text
  expect(totalItems).toBeInTheDocument();
});

test('allows users to toggle completion of a todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Todo to complete' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const toggleButton = screen.getByText(/Todo to complete/i);
  
  // Verify initial state
  expect(toggleButton).not.toHaveClass('done');
  
  // Simulate toggling completion
  fireEvent.click(toggleButton);
  
  // Verify that the class 'done' is now present
  expect(toggleButton).toHaveClass('done');
  
  fireEvent.click(toggleButton); // Toggle back
  expect(toggleButton).not.toHaveClass('done');
});
