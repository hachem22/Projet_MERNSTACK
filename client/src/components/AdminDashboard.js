import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/users');
        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error(`Unexpected response status: ${response.status}`);
          setUsers([]);
        }
      } catch (error) {
        console.error('AdminDashboard - Error fetching users:', error.message);
        setUsers([]); // Ensure users state is set to an empty array on error
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {users.length === 0 && <p>No users found. Please check the API or add users.</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;