import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  AppBar,
  Toolbar
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setEditData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setEditDialog(true);
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/admin/users/${currentUser._id}`, editData);
      setUsers(users.map(u => 
        u._id === currentUser._id ? { ...u, ...editData } : u
      ));
      setEditDialog(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update user');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/admin/users/${userId}`);
        setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to delete user');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Administration
          </Typography>
          <Button 
            color="inherit"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Gestion des utilisateurs
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nom</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Rôle</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(user => (
                  <TableRow 
                    key={user._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell sx={{ '& > button': { mx: 0.5 } }}>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <Edit color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user._id)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>

      {/* Edit User Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)}>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Nom"
            value={editData.name}
            onChange={(e) => setEditData({...editData, name: e.target.value})}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={editData.email}
            onChange={(e) => setEditData({...editData, email: e.target.value})}
          />
          <TextField
            select
            margin="normal"
            fullWidth
            label="Rôle"
            value={editData.role}
            onChange={(e) => setEditData({...editData, role: e.target.value})}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Annuler</Button>
          <Button 
            variant="contained" 
            onClick={handleEditSubmit}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminDashboard;
