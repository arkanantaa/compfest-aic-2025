import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import LocationDetailsPage from './pages/LocationDetailsPage';
import ProposalsPage from './pages/ProposalsPage'; 

const useAuth = () => {
  const isLoggedIn = true;
  return isLoggedIn;
};
const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
};


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/map" />} />
      <Route path="/map" element={<MainLayout />} />
      
      {/* */}
      <Route 
        path="/home"
        element={
          <ProtectedRoute>
            <LocationDetailsPage />
          </ProtectedRoute>
        } 
      />

      {/* */}
      <Route 
        path="/proposals" 
        element={
          <ProtectedRoute>
            <ProposalsPage />
          </ProtectedRoute>
        } 
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/map" />} />
    </Routes>
  );
}

export default App;
