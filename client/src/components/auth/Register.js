import React, { useState } from 'react';
import { useAuthContext } from '../../context/authContext';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  Link,
  Grid
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

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, setError] = useState(null);
  const { register } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await register({ name, email, password });
      if (!success) {
        setError("Erreur lors de l'inscription");
      }
    } catch (err) {
      setError("Erreur lors de l'inscription");
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
            Créer un compte TunisAir
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom complet"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
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
              S'inscrire
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link href="/login" variant="body2" sx={{ color: '#005baa', fontWeight: 500 }}>
                Déjà un compte? Connectez-vous à TunisAir
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
