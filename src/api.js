import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001',
    withCredentials: true, // Inclut les cookies ou tokens dans les requêtes
});

// Exemple d'appel API
export const fetchUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
