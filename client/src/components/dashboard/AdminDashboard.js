import { useAuthContext } from '../../context/authContext';
import { Box, Typography, Paper, Grid, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

import { tunisairTheme } from '../../theme/tunisairTheme';

const AdminDashboard = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ 
      backgroundColor: tunisairTheme.background,
      minHeight: '100vh',
      p: 4,
      position: 'relative'
    }}>
      <Button 
        variant="contained"
        onClick={handleLogout}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: tunisairTheme.secondary,
          '&:hover': {
            backgroundColor: '#003366'
          }
        }}
      >
        Déconnexion
      </Button>
      <Typography variant="h3" component="h1" sx={{
        mb: 4,
        color: tunisairTheme.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        borderBottom: `3px solid ${tunisairTheme.secondary}`,
        display: 'inline-block',
        pb: 1
      }}>
        TABLEAU DE BORD ADMINISTRATEUR
      </Typography>

      <Typography variant="h5" sx={{ 
        mb: 4,
        color: tunisairTheme.text
      }}>
        Bienvenue, <span style={{ color: tunisairTheme.primary }}>{user?.name}</span>
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{
            p: 3,
            height: '100%',
            borderRadius: '12px',
            backgroundColor: tunisairTheme.white,
            borderTop: `4px solid ${tunisairTheme.primary}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <PeopleIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                UTILISATEURS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text, mb: 2 }}>
              Gestion des comptes utilisateurs et des permissions.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/user-management"
              sx={{ 
                backgroundColor: tunisairTheme.primary,
                '&:hover': {
                  backgroundColor: '#B5000D'
                }
              }}
            >
              Gérer les utilisateurs
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ 
            p: 3,
            height: '100%',
            borderRadius: '12px',
            backgroundColor: tunisairTheme.white,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <FlightTakeoffIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                VOLS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text, mb: 2 }}>
              Gestion des vols et des horaires.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/admin/flights"
              sx={{ 
                backgroundColor: tunisairTheme.primary,
                '&:hover': {
                  backgroundColor: '#B5000D'
                }
              }}
            >
              Gérer les vols
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ 
            p: 3,
            height: '100%',
            borderRadius: '12px',
            backgroundColor: tunisairTheme.white,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <AssessmentIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                RAPPORTS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text, mb: 2 }}>
              Accès aux rapports et statistiques.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/admin/reports"
              sx={{ 
                backgroundColor: tunisairTheme.primary,
                '&:hover': {
                  backgroundColor: '#B5000D'
                }
              }}
            >
              Voir les rapports
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Paper elevation={3} sx={{ 
            p: 3,
            height: '100%',
            borderRadius: '12px',
            backgroundColor: tunisairTheme.white,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}>
              <SettingsIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                PARAMÈTRES
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text, mb: 2 }}>
              Configuration du système et des préférences.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/admin/settings"
              sx={{ 
                backgroundColor: tunisairTheme.primary,
                '&:hover': {
                  backgroundColor: '#B5000D'
                }
              }}
            >
              Configurer
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
