// src/auth.service.js
import axios from 'axios';
// Beispiel für die Login-Funktion in auth.service.js
const login = (username, password) => {
  return axios.post("http://localhost:8080/api/auth/signin", { username, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("jwt_token", response.data.accessToken);
      }
      return response.data;
    });
};


export default {
  login,
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
