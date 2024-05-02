// src/RequireAuth.jsx
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('jwt_token');
    return token ? children : <Navigate to="/login" />;
};

export default RequireAuth;

