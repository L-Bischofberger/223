// AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthStatus] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setAuthStatus(true);
        setUser(userData);
      } catch (error) {
        console.error('Fehler beim Parsen der Benutzerdaten:', error);
        // Log-Out im Fehlerfall
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user');
        setAuthStatus(false);
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthStatus, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};



/*
//login hat funktiooniert mit benuzer anzeigen
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  setAuthStatus: () => {},
  setUser: () => {}
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthStatus] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setAuthStatus(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthStatus, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};*/




