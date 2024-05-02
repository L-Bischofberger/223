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

/*
//login hat funktiooniert mit benuzer anzeigen
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthStatus } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password
      });
      if (response.data.accessToken && response.data.user) {
        localStorage.setItem('jwt_token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Speichern der Benutzerdaten
        setAuthStatus(true);
        setUser(response.data.user); // Setze Benutzer im Kontext
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div>
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
    </div>
  );
};

export default Login;*/





/*
//das sit der code der zuerst hiert gestanden ist (15:10  1.5.2024)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from './auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AuthService.login(username, password);
      console.log('API Response:', response); // Für Debugging-Zwecke
  
      // Zugriff auf das accessToken über response.accessToken direkt
      if (response && response.accessToken) {
        localStorage.setItem('jwt_token', response.accessToken); // Speichern des Tokens
        navigate('/'); // Weiterleitung zur Hauptseite nach erfolgreichem Login
        console.log('Login erfolgreich: Token gespeichert');
      } else {
        // Diese Fehlermeldung wird ausgelöst, wenn kein accessToken gefunden wird
        throw new Error('Token nicht erhalten oder ungültige Anmeldedaten');
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login fehlgeschlagen: " + (error.response?.data?.message || error.message || "Unbekannter Fehler"));
    }
  };
  

  
  
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;*/
