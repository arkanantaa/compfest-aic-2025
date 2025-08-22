import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LocationDetailsPage from './pages/LocationDetailsPage';
import ProposalsPage from './pages/ProposalsPage';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUpPage />} />

      {/* Protected application area */}
      <Route element={<ProtectedRoute />}> 
        <Route path="/" element={<MainLayout />}> 
          <Route index element={<LocationDetailsPage />} />
          <Route path="proposals" element={<ProposalsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
    </Routes>
  );
}

export default App;