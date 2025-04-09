import React, { useContext } from 'react';
import { Box, Container, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import AuthContext from '../../context/authContext';

const ClientDashboard = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      Client Dashboard
    </Typography>
    <Typography>
      Welcome to the client dashboard! Here you can view your personalized content.
    </Typography>
    {/* Add more client-specific content here */}
  </Container>
);

const AdminDashboard = () => {
  const users = [
    { id: 1, name: 'User One', email: 'user1@example.com' },
    { id: 2, name: 'User Two', email: 'user2@example.com' },
    // Add more mock users or fetch from backend
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography>
        Welcome to the admin dashboard! Here you can manage users.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">User Management</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" sx={{ mr: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" color="error">
          User not authenticated. Please log in.
        </Typography>
      </Container>
    );
  }

  if (!user.role) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h6" color="error">
          User role is missing. Please contact support.
        </Typography>
      </Container>
    );
  }

  return user.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />;
};

export default Dashboard;