import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = process.env.EXPO_PUBLIC_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para injetar o token
api.interceptors.request.use(
  async (config) => {
    try {
      // Busca o token no armazenamento do celular
      const token = await AsyncStorage.getItem('@meu_app_token');

      // Se achou o token, coloca no cabeçalho
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao pegar token no AsyncStorage:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;