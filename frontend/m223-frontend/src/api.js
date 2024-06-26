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
//Ruft alle Events vom Server ab.
export const fetchEvents = () => {
  return axios.get(`${API_URL}/events`);
};
//Fügt ein neues Event hinzu
export const addEvent = (eventData) => {
  return axios.post(`${API_URL}/events`, {
    title: eventData.title,
    startTime: eventData.startTime,
    endTime: eventData.endTime,
    isAllDay: eventData.isAllDay,
    public: eventData.public, 
    description: eventData.description,
    location: eventData.location
  });
};
//Aktualisiert ein bestehendes Event
export const updateEvent = (id, eventData) => {
  return axios.put(`${API_URL}/events/${id}`, eventData);
};
//Löscht ein Event
export const deleteEvent = (id) => {
  return axios.delete(`${API_URL}/events/${id}`);
};
//Schaltet den öffentlichen Status eines um
export const togglePublic = (id) => {
  return axios.put(`${API_URL}/events/${id}/togglePublic`);
};

export default {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  togglePublic
};
