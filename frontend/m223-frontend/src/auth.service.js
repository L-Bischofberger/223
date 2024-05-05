// src/auth.service.js
import axios from 'axios';

const login = (username, password) => {
  return axios.post("http://localhost:8080/api/auth/signin", { username, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("jwtToken", response.data.accessToken);  // Konsistenter Token-Schlüssel
      }
      return response.data;
    })
    .catch(error => {
      // Behandle Fehler, wie unerlaubte Zugriffe oder Serverfehler, und gebe eine verständliche Nachricht zurück
      throw new Error(error.response.data.message || "Login fehlgeschlagen");
    });
};

const logout = () => {
  localStorage.removeItem("jwtToken"); // Entferne das Token aus dem Local Storage
};

export default {
  login,
  logout
};







// src/auth.service.js
/*import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", { username, password })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;*/
