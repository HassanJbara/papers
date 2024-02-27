import axios from "axios";

const backendUrl = import.meta.env.PROD
  ? import.meta.env.VITE_BACKEND_URL
  : import.meta.env.VITE_DEV_BACKEND_URL;
const frontendUsername = import.meta.env.VITE_FRONTEND_USERNAME;
const frontendPassword = import.meta.env.VITE_FRONTEND_PASSWORD;

export const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: backendUrl,
  auth: {
    username: frontendUsername,
    password: frontendPassword,
  },
});
