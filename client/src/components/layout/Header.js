import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tableaux de bord Power BI
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {user ? (
            <>
              {user.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin-dashboard">
                  Tableau Admin
                </Button>
              )}
              {user.role !== 'admin' && (
                <Button color="inherit" component={Link} to="/client-dashboard">
                  Tableau Client
                </Button>
              )}
              {/* Display user's name */}
              <Typography sx={{ mr: 2 }}>
                {user.name || user.email} {/* Show name, fallback to email */}
              </Typography>
              <Button color="inherit" onClick={onLogout}>
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Inscription
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;