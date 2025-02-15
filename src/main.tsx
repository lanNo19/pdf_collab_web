import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

// We'll handle document-specific routing based on URL hash
const renderApp = () => {
  const root = document.getElementById('root') as HTMLElement;
  const hash = window.location.hash.slice(1); // Remove the '#' from the URL

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App initialDocUrl={hash || null} />
    </React.StrictMode>
  );
};

// Re-render the app whenever the URL hash changes
window.addEventListener('hashchange', renderApp);

// Initial render
renderApp();
