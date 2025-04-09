import { Box, Typography } from '@mui/material';

const AdminDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord Admin
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Bienvenue sur le tableau de bord Admin
      </Typography>
    </Box>
  );
};

export default AdminDashboard;