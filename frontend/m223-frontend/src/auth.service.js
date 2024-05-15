// src/auth.service.js
import axios from 'axios';
//Führt die Benutzeranmeldung durch.
const login = (username, password) => {
  return axios.post("http://localhost:8080/api/auth/signin", { username, password })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem("jwtToken", response.data.accessToken);
      }
      return response.data;
    })
    .catch(error => {
      throw new Error(error.response.data.message || "Login fehlgeschlagen");
    });
};
//Führt die Benutzerabmeldung durch
const logout = () => {
  localStorage.removeItem("jwtToken"); 
};

export default {
  login,
  logout
};
