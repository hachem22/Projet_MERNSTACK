import React from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography,
  Button,
  Container
} from '@mui/material';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function ClientDashboard() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tableau de bord Client
          </Typography>
          <Button 
            color="inherit"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Bienvenue sur votre espace client
        </Typography>
        <Typography paragraph>
          Vous pouvez accéder à vos fonctionnalités depuis cette interface.
        </Typography>
      </Container>
    </Box>
  );
}
