import { useContext } from 'react';
import AuthContext from '../../context/authContext';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord Client
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bienvenue, {user?.name}
      </Typography>
      
      <Button
        variant="contained"
        component={Link} // Ensure this is correctly used with `to` prop
        to="/powerbi-dashboard"
        sx={{ mt: 3 }}
      >
        View Power BI Dashboard
      </Button>
    </Box>
  );
};

export default ClientDashboard;