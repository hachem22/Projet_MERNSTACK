import React from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'; // Example icon

// Tunisair official theme colors
import { tunisairTheme } from '../../theme/tunisairTheme';

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: tunisairTheme.background, minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ 
        backgroundColor: tunisairTheme.white,
        color: tunisairTheme.secondary,
        boxShadow: 'none',
        borderBottom: `1px solid ${tunisairTheme.secondary}20`
      }}>
        <Toolbar>
          <FlightTakeoffIcon sx={{ 
            mr: 2,
            color: tunisairTheme.primary,
            fontSize: '2rem'
          }} />
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1,
            fontWeight: 'bold',
            letterSpacing: '1px'
          }}>
            TUNISAIR MANAGEMENT
          </Typography>
          <Button 
            component={RouterLink} 
            to="/login"
            sx={{
              color: tunisairTheme.secondary,
              mr: 2,
              '&:hover': {
                backgroundColor: `${tunisairTheme.secondary}10`
              }
            }}
          >
            CONNEXION
          </Button>
          <Button 
            variant="contained"
            component={RouterLink} 
            to="/register"
            sx={{
              backgroundColor: tunisairTheme.primary,
              borderRadius: '20px',
              px: 3,
              '&:hover': {
                backgroundColor: '#B5000D'
              }
            }}
          >
            INSCRIPTION
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ 
        mt: 8, 
        textAlign: 'center',
        py: 8
      }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ 
          color: tunisairTheme.secondary, 
          fontWeight: 'bold',
          fontSize: '3.5rem',
          mb: 4
        }}>
          BIENVENUE À BORD
        </Typography>
        <Typography variant="h5" paragraph sx={{ 
          color: tunisairTheme.text,
          lineHeight: '1.6',
          maxWidth: '800px',
          mx: 'auto',
          mb: 6
        }}>
          Gestion optimisée des opérations Tunisair. Accédez à des tableaux de bord, rapports et outils spécialement conçus pour la gestion aérienne.
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 3 }}>
          <Button 
            variant="contained" 
            size="large" 
            component={RouterLink} 
            to="/register" 
            sx={{ 
              px: 5,
              py: 1.5,
              borderRadius: '20px',
              backgroundColor: tunisairTheme.primary,
              fontSize: '1.1rem',
              '&:hover': { 
                backgroundColor: '#B5000D',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            COMMENCER
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            component={RouterLink} 
            to="/login" 
            sx={{ 
              px: 5,
              py: 1.5,
              borderRadius: '20px',
              borderColor: tunisairTheme.secondary, 
              color: tunisairTheme.secondary,
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: `${tunisairTheme.secondary}10`,
                borderColor: tunisairTheme.accent,
                color: tunisairTheme.accent
              },
              transition: 'all 0.3s ease'
            }}
          >
            ACCÉDER À MON COMPTE
          </Button>
        </Box>
      </Container>

      {/* Feature Highlights */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h3" component="h2" sx={{ 
          textAlign: 'center',
          color: tunisairTheme.secondary,
          mb: 6,
          fontWeight: 'bold'
        }}>
          NOS FONCTIONNALITÉS
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          gap: 4
        }}>
          <Paper elevation={3} sx={{ 
            p: 4, 
            width: '300px', 
            textAlign: 'center',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <FlightTakeoffIcon sx={{ 
              fontSize: '3rem', 
              color: tunisairTheme.primary,
              mb: 2
            }} />
            <Typography variant="h5" sx={{ 
              color: tunisairTheme.secondary,
              mb: 2,
              fontWeight: '600'
            }}>
              TABLEAUX DE BORD
            </Typography>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Visualisation des indicateurs clés de performance en temps réel.
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ 
            p: 4, 
            width: '300px', 
            textAlign: 'center',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <FlightTakeoffIcon sx={{ 
              fontSize: '3rem', 
              color: tunisairTheme.primary,
              mb: 2
            }} />
            <Typography variant="h5" sx={{ 
              color: tunisairTheme.secondary,
              mb: 2,
              fontWeight: '600'
            }}>
              RAPPORTS
            </Typography>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Génération de rapports détaillés sur les opérations aériennes.
            </Typography>
          </Paper>
          <Paper elevation={3} sx={{ 
            p: 4, 
            width: '300px', 
            textAlign: 'center',
            borderRadius: '12px',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <FlightTakeoffIcon sx={{ 
              fontSize: '3rem', 
              color: tunisairTheme.primary,
              mb: 2
            }} />
            <Typography variant="h5" sx={{ 
              color: tunisairTheme.secondary,
              mb: 2,
              fontWeight: '600'
            }}>
              GESTION DES UTILISATEURS
            </Typography>
            <Typography variant="body1" sx={{ color: tunisairTheme.text }}>
              Contrôle des accès et des rôles au sein du portail.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ 
        bgcolor: tunisairTheme.secondary, 
        color: tunisairTheme.white, 
        p: 4, 
        mt: 'auto', 
        textAlign: 'center'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          TUNISAIR MANAGEMENT PORTAL
        </Typography>
        <Typography variant="body2">
          © {new Date().getFullYear()} Tunisair. Tous droits réservés.
        </Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;