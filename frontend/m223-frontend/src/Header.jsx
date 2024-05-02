//src/Header.jsx
import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';

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
          <p>Welcome, {user ? user.username : 'Guest'}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </header>
  );
};

export default Header;


/*import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';

const Header = () => {
    const { isAuthenticated, user } = useContext(AuthContext);

    return (
        <div style={{ backgroundColor: "#f0f0f0", padding: "20px 20px" }}>
            {isAuthenticated ? (
                <p>Eingeloggt als: {user?.username}</p>
            ) : (
                <p>Nicht eingeloggt</p>
            )}
        </div>
    );
};

export default Header;*/
