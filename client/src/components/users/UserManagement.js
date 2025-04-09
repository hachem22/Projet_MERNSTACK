import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../../services/api';
import { CircularProgress } from '@mui/material';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { tunisairTheme } from '../../theme/tunisairTheme';

const UserManagement = () => {
  const [users, setUsers] = useState(null); // Initialisé à null pour distinguer "non chargé" de "chargé vide"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDelete = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }
    
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Erreur suppression:', error);
      setError(error.response?.data?.message || 'Échec de la suppression');
    }
  };

  const handleUpdate = (userId) => {
    // Implémentation de la mise à jour
    console.log('Mise à jour de l\'utilisateur:', userId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        const usersData = response.data.data || response.data || [];
        console.log('Données utilisateurs reçues:', {
          source: 'API',
          count: usersData.length,
          sample: usersData.length > 0 ? usersData[0] : 'Aucun utilisateur',
          status: 'success'
        });
        setUsers(usersData);
      } catch (error) {
        console.error('Erreur récupération utilisateurs:', {
          message: error.message,
          response: error.response?.data,
          stack: error.stack
        });
        setError(error.response?.data?.message || 'Erreur lors du chargement des utilisateurs');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
        letterSpacing: '1px',
        borderBottom: `3px solid ${tunisairTheme.secondary}`,
        display: 'inline-block',
        pb: 1
      }}>
        GESTION DES UTILISATEURS
      </Typography>

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
              {!loading && (!users || users.length === 0) ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="body1" color="textSecondary">
                      {users === null ? 'Chargement en cours...' : 'Aucun utilisateur trouvé'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users?.map((user) => (
                  <TableRow key={user._id || user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Button 
                      variant="contained"
                      onClick={() => handleUpdate(user._id)}
                      sx={{
                        backgroundColor: tunisairTheme.primary,
                        mr: 1,
                        '&:hover': {
                          backgroundColor: '#B5000D'
                        }
                      }}
                    >
                      Modifier
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => handleDelete(user._id)}
                      sx={{
                        borderColor: tunisairTheme.secondary,
                        color: tunisairTheme.secondary,
                        '&:hover': {
                          backgroundColor: `${tunisairTheme.secondary}10`
                        }
                      }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UserManagement;
