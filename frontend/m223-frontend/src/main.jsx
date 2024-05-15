// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import RequireAuth from './RequireAuth';
import Header from './Header'; 
import { AuthProvider } from './AuthProvider'; 
//Hauptkomponente der Anwendung, die routing und authentifizierung einrichtet
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><App /></RequireAuth>} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);