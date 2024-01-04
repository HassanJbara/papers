import axios from "axios";

const backendUrl = import.meta.env.PROD
  ? import.meta.env.VITE_BACKEND_URL
  : import.meta.env.VITE_DEV_BACKEND_URL;

export const axiosAPI = axios.create({
  withCredentials: false,
  timeout: 28000,
  baseURL: backendUrl,
  auth: {
    username: "admin",
    password: "root",
  },
});
