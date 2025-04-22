import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
  withCredentials: true,
});

export const login = (data) => API.post('/login', data);
export const register = (data) => API.post('/register', data);
export const verifyOTP = (data) => API.post('/verify-otp', data);
