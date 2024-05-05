// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Axios-Interceptor für das Setzen des Authorization-Headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API Funktionen
export const fetchEvents = () => {
  return axios.get(`${API_URL}/events`);
};

export const addEvent = (eventData) => {
  return axios.post(`${API_URL}/events`, eventData);
};

export const updateEvent = (id, eventData) => {
  return axios.put(`${API_URL}/events/${id}`, eventData);
};

export const deleteEvent = (id) => {
  return axios.delete(`${API_URL}/events/${id}`);
};

// Exportiert die Funktionen standardmäßig
export default {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent
};
