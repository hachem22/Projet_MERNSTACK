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
      const { data } = await api.get('/auth/me');
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
      const { data } = await api.post('/auth/login', credentials);
      
      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        
        // Store user data including role
        const userData = {
          ...data.user,
          role: data.user.role
        };
        setUser(userData);
        setError(null);
        
        // Verify token was stored
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
          throw new Error('Failed to store authentication token');
        }
        
        // Navigate based on role
        const redirectPath = data.redirectTo || (data.user.role === 'admin' ? '/admin-dashboard' : '/dashboard');
        navigate(redirectPath);
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

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Verify required fields
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error('Tous les champs sont obligatoires');
      }

      // First check if email exists
      try {
        const { data: checkData } = await api.get(`/auth/check-email?email=${formData.email}`);
        if (checkData.exists) {
          throw new Error('Un compte existe déjà avec cet email');
        }
      } catch (err) {
        throw new Error(err.response?.data?.message || err.message || "Erreur de vérification d'email");
      }

      // Proceed with registration if email is available
      const { data } = await api.post('/auth/register', formData);
      
      if (!data?.success || !data?.token) {
        throw new Error(data?.message || 'Échec de l\'enregistrement');
      }

      // Store and verify token
      localStorage.setItem('token', data.token);
      const storedToken = localStorage.getItem('token');
      if (storedToken !== data.token) {
        throw new Error('Échec du stockage du token');
      }

      // Set user data with role
      setUser({
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role || 'user'
      });

      return true;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         "Erreur lors de l'inscription";
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Attempt server-side logout but don't fail if it errors
      try {
        await api.post('/auth/logout');
      } catch (serverErr) {
        console.error('Server logout error:', serverErr);
      }
      
      // Force clear all client-side auth state
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      setError(null);
      
      // Reset API headers
      api.defaults.headers.common['Authorization'] = '';
      
      // Force reload to clear any cached state
      window.location.reload();
    } catch (err) {
      console.error('Logout error:', err);
      // Fallback cleanup
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
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
