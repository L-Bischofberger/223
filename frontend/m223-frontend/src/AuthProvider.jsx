// AuthProvider.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthStatus] = useState(false);
  const [user, setUser] = useState(null);
//Laden der Authentifizierungsdaten beim ersten Rendern der Komponente
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
    // Bereitstellung des AuthContext
    <AuthContext.Provider value={{ isAuthenticated, user, setAuthStatus, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};




