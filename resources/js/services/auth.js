import api from "./api";

export const hasToken = () => localStorage.getItem('api_token') !== null;
export const getToken = () => localStorage.getItem('api_token');


export const register = form => {
    return api.post('/api/register', form)
        .then(res => res.data)
        .then(data => {
            data.api_token && localStorage.setItem('api_token', data.api_token);
        });
};


export const login = form => {
    return api.post('/api/login', form)
        .then(res => res.data)
        .then(data => {
            data.api_token && localStorage.setItem('api_token', data.api_token);
        });
};

export const logout = () => {
  localStorage.removeItem('api_token');
};