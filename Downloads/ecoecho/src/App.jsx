// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'; // Layout halaman utama
import LoginPage from './pages/LoginPage';     // Halaman Login

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;