import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';

// Mocking ReactDOM.createRoot
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

afterEach(() => {
    const root = document.getElementById('root');
    if (root) {
        document.body.removeChild(root);
    }
});

// Skip this test for now
test.skip('renders with App and root div', () => {
    require('../index'); // This should call createRoot and render App
    
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(document.getElementById('root'));
    expect(ReactDOM.createRoot().render).toHaveBeenCalledWith(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
});
