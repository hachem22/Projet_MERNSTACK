import { useAuthContext } from '../../context/authContext'; // Modification ici
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { tunisairTheme } from '../../theme/tunisairTheme';

const ClientDashboard = () => {
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
        color: tunisairTheme.secondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          bottom: '-10px',
          left: '0',
          width: '100px',
          height: '4px',
          backgroundColor: tunisairTheme.primary,
          borderRadius: '2px'
        }
      }}>
        TABLEAU DE BORD CLIENT
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
            borderRadius: '16px',
            backgroundColor: tunisairTheme.white,
            borderLeft: `4px solid ${tunisairTheme.secondary}`,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: `0 10px 20px ${tunisairTheme.secondary}20`
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
                MES VOLS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Consultez vos prochains vols et historiques de voyages.
            </Typography>
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
              <EventAvailableIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                RÉSERVATIONS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Gérez et modifiez vos réservations en cours.
            </Typography>
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
              <CreditCardIcon sx={{ 
                fontSize: '2.5rem',
                color: tunisairTheme.primary,
                mr: 2
              }} />
              <Typography variant="h5" sx={{ 
                color: tunisairTheme.secondary,
                fontWeight: '600'
              }}>
                PAIEMENTS
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Consultez votre historique de paiements.
            </Typography>
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
                ANALYTICS
              </Typography>
            </Box>
            <Button
              variant="contained"
              component={Link}
              to="/powerbi-dashboard"
              sx={{ 
                mt: 2,
                backgroundColor: tunisairTheme.primary,
                '&:hover': {
                  backgroundColor: '#B5000D'
                }
              }}
            >
              Tableau de bord Power BI
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientDashboard;