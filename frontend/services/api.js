import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

// Courses API
export const coursesAPI = {
  getAll: (filters) => api.get('/courses', { params: filters }),
  getFeatured: () => api.get('/courses/featured'),
  getById: (id) => api.get(`/courses/${id}`),
};

// Colleges API
export const collegesAPI = {
  getAll: (filters) => api.get('/colleges', { params: filters }),
  getById: (id) => api.get(`/colleges/${id}`),
};

// Leads API
export const leadsAPI = {
  submit: (data) => api.post('/leads/submit', data),
  getAll: (params) => api.get('/leads', { params }),
  update: (id, data) => api.patch(`/leads/${id}`, data),
  exportCSV: () => api.get('/leads/export/csv'),
};

// Contact API
export const contactAPI = {
  send: (data) => api.post('/contact/contact', data),
};

export default api;