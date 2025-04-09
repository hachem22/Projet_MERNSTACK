import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Get the root element
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render your app
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);