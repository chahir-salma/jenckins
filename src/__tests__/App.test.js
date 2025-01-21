import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders To Do List title', () => {
  render(<App />);
  const titleElement = screen.getByText(/To Do List/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders the total number of items', () => {
  render(<App />);
  const totalItems = screen.getByText(/Total Items: 0/i);
  expect(totalItems).toBeInTheDocument();
});

test('allows users to add a todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'New Todo' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const todoItem = screen.getByText(/New Todo/i);
  expect(todoItem).toBeInTheDocument();
  const totalItems = screen.getByText(/Total Items: 1/i);
  expect(totalItems).toBeInTheDocument();
});

test('prevents adding empty todo items', () => {
  render(<App />);
  
  fireEvent.click(screen.getByText(/Add/i));
  
  const totalItems = screen.getByText(/Total Items: 0/i);
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
  const totalItems = screen.getByText(/Total Items: 0/i);
  expect(totalItems).toBeInTheDocument();
});

test('allows users to toggle completion of a todo item', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Todo to complete' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const toggleButton = screen.getByText(/Todo to complete/i);
  fireEvent.click(toggleButton);
  
  const completedTodo = screen.getByText(/Todo to complete/i);
  expect(completedTodo).toHaveClass('done');
  
  fireEvent.click(toggleButton);
  expect(completedTodo).not.toHaveClass('done');
});

test('checks if the input field is cleared after adding a todo', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Clear Test' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  expect(input.value).toBe('');
});

test('ensures buttons are accessible and interactive', () => {
  render(<App />);
  
  const input = screen.getByPlaceholderText(/Enter item.../i);
  fireEvent.change(input, { target: { value: 'Accessible Todo' } });
  fireEvent.click(screen.getByText(/Add/i));
  
  const deleteButton = screen.getByLabelText(/Delete Accessible Todo/i);
  expect(deleteButton).toBeVisible();
  expect(deleteButton).toBeEnabled();
  
  const toggleButton = screen.getByText(/Accessible Todo/i);
  expect(toggleButton).toBeVisible();
  expect(toggleButton).toBeEnabled();
});
