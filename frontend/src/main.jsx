// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { BrowserRouter } from 'react-router-dom'; // <-- Impor ini
import { AuthProvider } from './context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- Tambahkan ini */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter> {/* <-- Tambahkan ini */}
  </React.StrictMode>,
);