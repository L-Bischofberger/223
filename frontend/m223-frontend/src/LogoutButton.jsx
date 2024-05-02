//scr/LogoutButton.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');  // Leitet den Benutzer zur Login-Seite um
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
