import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Login from './Login';
import { AuthContext } from './AuthProvider';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mockt das Axios-Modul
jest.mock('axios');

describe('Login Component', () => {
  const setAuthStatus = jest.fn();
  const setUser = jest.fn();

  // Setup für den Mock-Response
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: { accessToken: 'fake-token', user: { username: 'testuser' } } });
  });

  // Testet das Rendern der Login-Komponente
  test('renders Login component', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ setAuthStatus, setUser }}>
          <Login />
        </AuthContext.Provider>
      </Router>
    );
    expect(screen.getByText(/Username/i)).toBeInTheDocument();
    expect(screen.getByText(/Password/i)).toBeInTheDocument();
  });

  // Testet den Login-Prozess
  test('logs in the user', async () => {
    await act(async () => {
      render(
        <Router>
          <AuthContext.Provider value={{ setAuthStatus, setUser }}>
            <Login />
          </AuthContext.Provider>
        </Router>
      );
    });

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: '12345678' } });

    fireEvent.click(screen.getByText(/Login/i));

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/api/auth/signin', {
      username: '12345678',
      password: '12345678'
    });

    await act(async () => {
      await screen.findByText(/Welcome, 12345678!/i);
    });

    expect(setAuthStatus).toHaveBeenCalledWith(true);
    expect(setUser).toHaveBeenCalledWith({ username: '12345678' });
  });
});
