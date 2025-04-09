import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button,
  Avatar,
  CssBaseline,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005baa', // Bleu Tunisair
    },
    secondary: {
      main: '#d40511', // Rouge Tunisair
    },
    background: {
      default: '#f5f9ff', // Fond clair bleuté
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h5: {
      fontWeight: 600,
      color: '#005baa'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: '20px',
          padding: '10px 24px',
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: '1rem'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          }
        }
      }
    }
  }
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }, navigate); // Now using the context login
    } catch (err) {
      setError('Erreur lors de la connexion');
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ background: 'white', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 91, 170, 0.1)', padding: '40px', marginTop: '80px' }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main', width: 60, height: 60 }}>
            <LockOutlinedIcon fontSize="medium" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Connexion à TunisAir
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ 
              mt: 1,
              width: '100%'
            }}
          >
            {/* Affichage des erreurs */}
            {error && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                background: 'linear-gradient(90deg, #005baa 0%, #003366 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #003366 0%, #005baa 100%)'
                }
              }}
            >
              Se connecter
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="/register" variant="body2" sx={{ color: '#005baa', fontWeight: 500 }}>
                Pas de compte? Créez votre compte TunisAir
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
