// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // <-- 1. Impor komponen baru

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} /> {/* <-- 2. Tambahkan route baru */}
    </Routes>
  );
}

export default App;