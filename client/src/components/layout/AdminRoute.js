import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const AdminRoute = () => {
  const { user, loading, fetchUser } = useContext(AuthContext);

  // Fetch user data on component mount if not already loaded
  useEffect(() => {
    if (!user && !loading) {
      fetchUser(); // Ensure this function exists in AuthContext to fetch user data
    }
  }, [user, loading, fetchUser]);

  // Ensure loading state is handled
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/client-dashboard" replace />;
  }

  // Render child components if user is authenticated and is an admin
  return <Outlet />;
};

export default AdminRoute;