import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wrap routes that require authentication
export default function ProtectedRoute({ redirectTo = '/login' }) {
  const { user, loading, ready } = useAuth();
  const location = useLocation();

  if (loading && !ready) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading session...</div>;
  }

  if (ready && !user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
