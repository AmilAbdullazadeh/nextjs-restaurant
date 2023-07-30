import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials);

export const register = (userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    city: string;
}) => api.post('/auth/register', userDetails);

export const logout = () => api.post('/auth/logout');
