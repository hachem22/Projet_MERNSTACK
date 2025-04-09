import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/api/auth/me');
      setUser(data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching user:', err);
      setUser(null);
      localStorage.removeItem('token');
      setError(err.response?.data?.message || 'Session expirée');
    } finally {
      setLoading(false);
    }
  };
  
  const login = async (credentials, navigate) => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/auth/login', credentials);
      
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setError(null);
        navigate(data.redirectTo || (data.user.role === 'admin' ? '/admin-dashboard' : '/dashboard'));
        return true;
      }
      throw new Error(data.message || 'Login failed');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || err.message || 'Échec de la connexion');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const { data } = await api.post('/api/auth/register', userData);
      
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setError(null);
        return true;
      }
      throw new Error(data.message || 'Registration failed');
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Échec de l'inscription");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout,
      fetchUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
