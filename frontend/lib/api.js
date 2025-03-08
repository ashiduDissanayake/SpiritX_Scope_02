import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication services
export const authService = {
  register: async (username, password) => {
    const response = await api.post('/auth/register', { username, password });
    return response.data;
  },
  
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  },
  
  isAuthenticated: () => {
    return localStorage.getItem('token') !== null;
  },
  
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user && user.isAdmin;
  },
};

// Player services
export const playerService = {
  getAllPlayers: async () => {
    const response = await api.get('/players');
    return response.data;
  },
  
  getPlayerById: async (id) => {
    const response = await api.get(`/players/${id}`);
    return response.data;
  },
  
  // Admin only functions
  createPlayer: async (playerData) => {
    const response = await api.post('/players', playerData);
    return response.data;
  },
  
  updatePlayer: async (id, playerData) => {
    const response = await api.put(`/players/${id}`, playerData);
    return response.data;
  },
  
  deletePlayer: async (id) => {
    const response = await api.delete(`/players/${id}`);
    return response.data;
  },
};

// Team services
export const teamService = {
  getUserTeam: async () => {
    const response = await api.get('/teams/my-team');
    return response.data;
  },
  
  addPlayerToTeam: async (playerId) => {
    const response = await api.post(`/teams/add-player/${playerId}`);
    return response.data;
  },
  
  removePlayerFromTeam: async (teamPlayerId) => {
    const response = await api.delete(`/teams/remove-player/${teamPlayerId}`);
    return response.data;
  },
  
  getLeaderboard: async () => {
    const response = await api.get('/teams/leaderboard');
    return response.data;
  },
};

// Stats services
export const statsService = {
  getTournamentSummary: async () => {
    const response = await api.get('/stats/tournament-summary');
    return response.data;
  },
  
  getAllPlayerStats: async () => {
    const response = await api.get('/stats/player-stats');
    return response.data;
  },
};

// Chatbot services
export const chatbotService = {
  sendQuery: async (query) => {
    const response = await api.post('/chatbot/query', { query });
    return response.data;
  },
};

export default api;