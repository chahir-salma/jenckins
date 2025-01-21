import React from 'react';
import ReactDOM from 'react-dom/client'; // Ensure you're importing from the correct path
import App from '../App.jsx'; // Adjust the import path as necessary

jest.mock('react-dom/client', () => ({
    createRoot: jest.fn(() => ({
        render: jest.fn(),
    })),
}));

beforeEach(() => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
});

test('renders with App and root div', () => {
    require('../index'); // This should call createRoot and render App
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(ReactDOM.createRoot().render).toHaveBeenCalledWith(<App />);
});
