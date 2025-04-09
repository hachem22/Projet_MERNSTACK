import React from 'react';
import { Box } from '@mui/material';
import UserManagement from '../components/users/UserManagement';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function UserManagementPage() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <UserManagement />
    </Box>
  );
}
