import axios from "axios";
import { getToken } from "./auth";
import { useNavigate } from 'react-router-dom';

const api = axios.create({
//   baseURL: "http://localhost"
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(res => res, error => {
    if(error.response.status === 403) { 
        useNavigate('/login');
    }

    return Promise.reject(error);
});

export default api;