import React from 'react';
import { Box } from '@mui/material';
import ClientDashboard from '../components/dashboard/ClientDashboard';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboardPage() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async () => {
    try {
      await logout();
      // Clear all auth-related storage
      localStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback cleanup if logout fails
      localStorage.removeItem('token');
      sessionStorage.clear();
      navigate('/login');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ClientDashboard />
    </Box>
  );
}
