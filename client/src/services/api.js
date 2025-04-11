import axios from 'axios';

// Configuration de base avec des valeurs par défaut
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';
const API_TIMEOUT = 10000; // 10 secondes

// Création de l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Intercepteur pour ajouter le token JWT aux requêtes
 */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    if (process.env.NODE_ENV === 'development') {
      console.debug('[API] Token ajouté aux headers');
    }
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[API] Aucun token trouvé');
    }
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

/**
 * Intercepteur pour gérer les réponses et erreurs
 */
api.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('[API] Réponse reçue:', response.config.url, response.data);
    }
    return response;
  },
  error => {
    if (error.response) {
      // Erreurs 4xx/5xx
      console.error(
        `[API] Erreur ${error.response.status} sur ${error.config.url}:`,
        error.response.data
      );
      
      // Gestion spécifique des erreurs 401 (Non autorisé)
      if (error.response.status === 401) {
        // Vous pourriez déconnecter l'utilisateur ici
        console.warn('[API] Session expirée, déconnexion...');
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirection forcée
      }
    } else if (error.request) {
      // La requête a été faite mais aucune réponse reçue
      console.error('[API] Pas de réponse du serveur:', error.request);
    } else {
      // Erreur lors de la configuration de la requête
      console.error('[API] Erreur de configuration:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Export des méthodes API spécifiques
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log('[DEBUG] API Response:', response);
    return response;
  } catch (error) {
    console.error('[DEBUG] Full API Error:', error);
    throw error;
  }
};
export const getUserById = (id) => api.get(`/users/${id}`);
export const createUser = (userData) => api.post('/users', userData);
export const updateUser = (id, userData) => api.put(`/users/${id}`, userData);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Export de l'instance de base pour les requêtes personnalisées
export default api;