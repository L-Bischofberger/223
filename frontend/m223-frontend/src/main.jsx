// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import RequireAuth from './RequireAuth';
import Header from './Header'; // Importiere die Header-Komponente
import { AuthProvider } from './AuthProvider'; // Import korrekt einbinden

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

/*
//login hat funktiooniert mit benuzer anzeigen
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import RequireAuth from './RequireAuth';
import Header from './Header'; // Importiere die Header-Komponente
import { AuthProvider } from './AuthProvider'; // Import korrekt einbinden

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* AuthProvider stellt den AuthContext bereit /}
      <Header />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><App /></RequireAuth>} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
;*/





/*import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
  {
    path: "/public",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);*/
