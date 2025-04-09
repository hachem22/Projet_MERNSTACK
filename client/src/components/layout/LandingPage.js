import React from 'react';
import { Box, Container, Typography, Button, AppBar, Toolbar, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff'; // Example icon

// Basic Tunisair-like theme colors (adjust as needed)
const tunisairTheme = {
  primary: '#D81E05', // Red
  secondary: '#004B87', // Blue
  text: '#333333',
  background: '#f4f4f4',
};

const LandingPage = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: tunisairTheme.background, minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: tunisairTheme.primary }}>
        <Toolbar>
          <FlightTakeoffIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tunisair Management Portal
          </Typography>
          <Button color="inherit" component={RouterLink} to="/login">Login</Button>
          <Button color="inherit" component={RouterLink} to="/register">Register</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: tunisairTheme.secondary, fontWeight: 'bold' }}>
          Welcome Aboard
        </Typography>
        <Typography variant="h5" color="textSecondary" paragraph sx={{ color: tunisairTheme.text }}>
          Manage your operations efficiently with the Tunisair Management Portal. Access dashboards, reports, and tools tailored for airline management.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button variant="contained" size="large" component={RouterLink} to="/register" sx={{ mr: 2, backgroundColor: tunisairTheme.primary, '&:hover': { backgroundColor: '#b71c04' } }}>
            Get Started
          </Button>
          <Button variant="outlined" size="large" component={RouterLink} to="/login" sx={{ borderColor: tunisairTheme.secondary, color: tunisairTheme.secondary }}>
            Access Your Account
          </Button>
        </Box>
      </Container>

      {/* Feature Highlights (Example) */}
      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
          <Paper elevation={3} sx={{ p: 3, width: '30%', minWidth: '250px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: tunisairTheme.secondary }}>Dashboards</Typography>
            <Typography variant="body2" sx={{ color: tunisairTheme.text }}>Visualize key metrics and performance indicators.</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 3, width: '30%', minWidth: '250px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: tunisairTheme.secondary }}>Reporting</Typography>
            <Typography variant="body2" sx={{ color: tunisairTheme.text }}>Generate and access detailed operational reports.</Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 3, width: '30%', minWidth: '250px', textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: tunisairTheme.secondary }}>User Management</Typography>
            <Typography variant="body2" sx={{ color: tunisairTheme.text }}>Control access and roles within the portal.</Typography>
          </Paper>
        </Box>
      </Container>

      {/* Footer (Example) */}
      <Box component="footer" sx={{ bgcolor: tunisairTheme.secondary, color: 'white', p: 3, mt: 'auto', textAlign: 'center' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Tunisair Management Portal. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default LandingPage;