import axios from 'axios';

// Configuración base de la API
const api = axios.create({
  baseURL: 'http://localhost:5187', // URL del API Gateway
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token de autenticación
api.interceptors.request.use(config => {
  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const { token } = JSON.parse(authData);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error al parsear datos de autenticación:', error);
    }
  }
  return config;
});

// Interfaces para tipado
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

interface UserActivity {
  id: string;
  userId: string;
  type: string;
  description: string;
  date: string;
}

interface AuctionData {
  title: string;
  description: string;
  startingPrice: number;
  endDate: string;
  categories: string[];
  imageUrl: string;
}

// Servicios de autenticación
export const authService = {
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post('/api/Usuarios', userData);
    return response.data;
  },

  confirmAccount: async (token: string) => {
    const response = await api.patch('/api/Usuarios/confirmar', { token });
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.patch('/api/Usuarios/cambiar-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  },

  requestPasswordRecovery: async (email: string) => {
    const response = await api.post('/api/Usuarios/solicitar-recuperacion', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string) => {
    const response = await api.patch('/api/Usuarios/restablecer-password', {
      token,
      newPassword
    });
    return response.data;
  }
};

// Servicios de usuario
export const userService = {
  getProfile: async (userId: string) => {
    const response = await api.get(`/api/Usuarios/${userId}`);
    return response.data as UserProfile;
  },

  updateProfile: async (userId: string, userData: Partial<UserProfile>) => {
    const response = await api.put('/api/Usuarios/actualizar-perfil', {
      userId,
      ...userData
    });
    return response.data;
  },

  getUserHistory: async (userId: string) => {
    const response = await api.get(`/api/Usuarios/${userId}/historial`);
    return response.data as UserActivity[];
  },

  getAllActivities: async () => {
    const response = await api.get('/api/Usuarios/actividades');
    return response.data as UserActivity[];
  }
};

// Servicios de subastas
export const auctionService = {
  getAuctions: async () => {
    const response = await api.get('/auctions');
    return response.data;
  },

  getAuctionById: async (id: string) => {
    const response = await api.get(`/auctions/${id}`);
    return response.data;
  },

  createAuction: async (auctionData: AuctionData) => {
    const response = await api.post('/auctions', auctionData);
    return response.data;
  },

  placeBid: async (auctionId: string, amount: number) => {
    const response = await api.post(`/auctions/${auctionId}/bids`, { amount });
    return response.data;
  }
};

export default api;