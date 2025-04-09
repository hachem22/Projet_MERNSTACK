import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/auth/me');
      if (response.data.user) {
        setUser(response.data.user);
        // La redirection est gérée par l'intercepteur de réponse dans api.js
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/api/auth/register', formData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData, navigate) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post('/api/auth/login', formData);
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      console.log('Login successful - Token:', response.data.token);
      
      // Redirection basée sur le rôle de l'utilisateur
      const redirectPath = response.data.user.role === 'admin' 
        ? '/admin-dashboard' 
        : '/client-dashboard';
      navigate(redirectPath);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Échec de la connexion');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      register, 
      login, 
      logout,
      fetchUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
