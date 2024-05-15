// src/RequireAuth.jsx
import { Navigate } from 'react-router-dom';
//Komponenten der sie zum login weiterleited fals man nicht eingelogt ist. 
const RequireAuth = ({ children }) => {
    const token = localStorage.getItem('jwt_token');
    return token ? children : <Navigate to="/login" />;
};

export default RequireAuth;

