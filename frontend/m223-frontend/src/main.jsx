import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Public from './components/Public';
import App from './components/App';
import Login from './components/login';
import ProtectedRoute from './components/ProtectedRoute'; // Importiere die geschützte Route

const isLoggedIn = localStorage.getItem('user') ? true : false; // Überprüfe, ob der Benutzer angemeldet ist

const router = (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <ProtectedRoute
        path="/"
        element={<App />}
        isLoggedIn={isLoggedIn}
      />
      <ProtectedRoute
        path="/public"
        element={<Public />}
        isLoggedIn={isLoggedIn}
      />
      {/* Weitere geschützte Routen hier */}
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);
export default router; // Füge die Exportanweisung hinzu, falls benötigt
// Main.jsx
/* 12:46 26.04.2024
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Public from './components/Public';
import App from './components/App';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'; // Importiere die geschützte Route

const isLoggedIn = localStorage.getItem('user') ? true : false; // Überprüfe, ob der Benutzer angemeldet ist

const router = (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <ProtectedRoute
        path="/"
        element={<App />}
        isLoggedIn={isLoggedIn}
      />
      <ProtectedRoute
        path="/public"
        element={<Public />}
        isLoggedIn={isLoggedIn}
      />
      {/* Weitere geschützte Routen hier *//*}
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);*/
