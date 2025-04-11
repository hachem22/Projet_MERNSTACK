import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, createUser, updateUser } from '../../services/api';
import { 
  CircularProgress,
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { tunisairTheme } from '../../theme/tunisairTheme';

const UserManagement = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [roleFilter, setRoleFilter] = useState('all');

  const roles = ['admin', 'client'];

  const handleOpenDialog = (user = null) => {
    setCurrentUser(user || { role: 'user' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUser?._id) {
        await updateUser(currentUser._id, currentUser);
        setSnackbar({ open: true, message: 'Utilisateur mis à jour', severity: 'success' });
      } else {
        await createUser(currentUser);
        setSnackbar({ open: true, message: 'Utilisateur créé', severity: 'success' });
      }
      fetchUsers();
      handleCloseDialog();
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Erreur', 
        severity: 'error' 
      });
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
      setSnackbar({ open: true, message: 'Utilisateur supprimé', severity: 'success' });
    } catch (error) {
      setSnackbar({ 
        open: true, 
        message: error.response?.data?.message || 'Erreur', 
        severity: 'error' 
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser(prev => ({ ...prev, [name]: value }));
  };

  const fetchUsers = async () => {
    try {
      console.log('Fetching users from:', `${process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1'}/users`);
      const response = await getUsers();
      // Handle both response formats: 
      // - Direct array of users
      // - Or { success, data } format
      const usersData = Array.isArray(response.data) 
        ? response.data 
        : (response.data?.data || []);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(
        error.response?.data?.error || 
        error.message || 
        'Erreur lors du chargement des utilisateurs'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const filteredUsers = users?.filter(user => 
    roleFilter === 'all' || user.role === roleFilter
  );

  if (error) {
    return (
      <Box sx={{ p: 4, color: tunisairTheme.error }}>
        <Typography variant="h6">Erreur: {error}</Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const commonButtonStyle = {
    primary: {
      backgroundColor: tunisairTheme.primary,
      '&:hover': { backgroundColor: '#B5000D' }
    },
    secondary: {
      borderColor: tunisairTheme.secondary,
      color: tunisairTheme.secondary,
      '&:hover': { backgroundColor: `${tunisairTheme.secondary}10` }
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: tunisairTheme.background,
      minHeight: '100vh',
      p: 4
    }}>
      <Typography variant="h3" component="h1" sx={{
        mb: 4,
        color: tunisairTheme.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottom: `3px solid ${tunisairTheme.secondary}`,
        display: 'inline-block',
        pb: 1
      }}>
        GESTION DES UTILISATEURS
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filtrer par rôle</InputLabel>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            label="Filtrer par rôle"
          >
            <MenuItem value="all">Tous</MenuItem>
            {roles.map(role => (
              <MenuItem key={role} value={role}>{role}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button 
          variant="contained"
          onClick={() => handleOpenDialog()}
          sx={commonButtonStyle.primary}
        >
          Créer un utilisateur
        </Button>
      </Box>

      <Paper elevation={3} sx={{
        p: 3,
        borderRadius: '12px',
        backgroundColor: tunisairTheme.white,
        borderTop: `4px solid ${tunisairTheme.primary}`,
      }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Rôle</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Aucun utilisateur trouvé
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers?.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <Button 
                        variant="contained"
                        onClick={() => handleOpenDialog(user)}
                        sx={{ ...commonButtonStyle.primary, mr: 1 }}
                      >
                        Modifier
                      </Button>
                      <Button 
                        variant="outlined"
                        onClick={() => handleDelete(user._id)}
                        sx={commonButtonStyle.secondary}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentUser?._id ? 'Modifier utilisateur' : 'Nouvel utilisateur'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Nom"
              name="name"
              value={currentUser?.name || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={currentUser?.email || ''}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              required={!currentUser?._id}
              onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Rôle</InputLabel>
              <Select
                name="role"
                value={currentUser?.role || 'user'}
                onChange={handleChange}
                label="Rôle"
              >
                {roles.map(role => (
                  <MenuItem key={role} value={role}>{role}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            sx={commonButtonStyle.primary}
          >
            {currentUser?._id ? 'Mettre à jour' : 'Créer'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement;
