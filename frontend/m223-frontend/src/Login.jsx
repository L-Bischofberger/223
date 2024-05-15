// src/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthStatus, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  // Funktion zur Behandlung des Login-Formulars
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password
      });
      if (response.data.accessToken) {
        localStorage.setItem('jwt_token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setAuthStatus(true);
        setUser(response.data.user);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
