import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mock the reportWebVitals function to prevent unnecessary calls during testing
jest.mock('./reportWebVitals', () => jest.fn());

test('renders the App component without crashing', () => {
  // Create a mock div element to act as the root DOM node
  const div = document.createElement('div');
  div.id = 'root';
  document.body.appendChild(div);

  // Render the App component inside the mock root
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Verify the root contains content after rendering
  expect(div.innerHTML).toContain('<div');
});
