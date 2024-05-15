//src/Header.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
//Heder mit Abmeldefunktion
const Header = () => {
  const { isAuthenticated, user, setAuthStatus, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthStatus(false);
    setUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header style={{ padding: '20px', textAlign: 'center' }}>
      {isAuthenticated ? (
        <>
          <p>Welcome, Guest</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </header>
  );
};

export default Header;