import axios from "axios";
import { getEnvVariables } from "../helpers";
import { ca } from "date-fns/locale";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// Todo configurar interceptores para agregar token de autenticación
calendarApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      "x-token": token,
    };
  }
  return config;
});

// config.headers['Authorization'] = `Bearer ${token}`;

export default calendarApi;
