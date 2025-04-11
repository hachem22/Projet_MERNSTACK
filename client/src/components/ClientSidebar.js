import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';

function ClientSidebar() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ width: '250px', background: '#f4f4f4', padding: '20px' }}>
      <h3>Client Menu</h3>
      <ul>
        <li>Dashboard</li>
        <li>Profile</li>
        <li>Settings</li>
        <li><button onClick={handleLogout}>Déconnexion</button></li>
      </ul>
    </div>
  );
}

export default ClientSidebar;
