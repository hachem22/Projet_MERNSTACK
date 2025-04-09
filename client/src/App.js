import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/authContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserManagementPage from './pages/UserManagementPage';
import LandingPage from './components/layout/LandingPage';

const AppRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          user?.role === 'admin' 
            ? <Navigate to="/admin-dashboard" />
            : user?.role === 'client' 
              ? <Navigate to="/client-dashboard" />
              : <Navigate to="/login" />
        }
      />
      <Route
        path="/client-dashboard"
        element={
          user?.role === 'client' 
            ? <ClientDashboard /> 
            : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin-dashboard" 
        element={
          user?.role === 'admin' 
            ? <AdminDashboard /> 
            : <Navigate to="/login" />
        }
      />
      <Route
        path="/user-management" 
        element={
          user?.role === 'admin'
            ? <UserManagementPage />
            : <Navigate to="/login" />
        }
      />
      {/* Redirection de base après login */}
      <Route
        path="/dashboard"
        element={
          user?.role === 'admin'
            ? <Navigate to="/admin-dashboard" replace />
            : <Navigate to="/client-dashboard" replace />
        }
      />
      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
