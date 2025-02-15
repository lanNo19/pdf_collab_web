import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DocumentView } from './views/DocumentView';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App initialDocUrl={null} />} />
        <Route path="/document/:docId" element={<DocumentView docUrl={window.location.hash.slice(1)} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);