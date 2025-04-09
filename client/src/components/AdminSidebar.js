import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText } from '@mui/material';

function AdminSidebar() {
  return (
    <List>
      <ListItem button component={Link} to="/admin-dashboard">
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/admin-settings">
        <ListItemText primary="Settings" />
      </ListItem>
      <ListItem button component={Link} to="/admin-users">
        <ListItemText primary="Users" />
      </ListItem>
    </List>
  );
}

export default AdminSidebar;
