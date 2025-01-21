import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom/client'
import App from '../App.jsx'; // Adjust the import path as necessary

// Mocking ReactDOM.createRoot
jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => ({
        render: jest.fn(), // Mocking the render function
    })),
}));

beforeEach(() => {
    // Create a root element and append it to the document body
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});

test('renders with App and root div', () => {
    require('../index'); // This should call createRoot and render App
    
    // Check if createRoot was called with the correct argument
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    
    // Check if render was called with <App />
    expect(ReactDOM.createRoot().render).toHaveBeenCalledWith(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
