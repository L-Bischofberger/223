import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Public from './components/Public';
import App from './components/App';

const router = (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/public" element={<Public />} />
      {/* Weitere Routen hier */}
    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {router}
  </React.StrictMode>
);
