import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from './App';
import { fetchEvents } from './api';
import { AuthContext } from './AuthProvider';

// Mockt die fetchEvents-Funktion
jest.mock('./api', () => ({
  fetchEvents: jest.fn(() => Promise.resolve({ data: [{ id: 1, title: 'Test Event', startTime: '2022-01-01T00:00:00Z', endTime: '2022-01-01T02:00:00Z' }] })),
}));

describe('App Component', () => {
  // Testet das Rendern der App Komponente und das abrufen von ereignissen
  it('renders App component and fetches events', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/Private/i)).toBeInTheDocument();
    expect(fetchEvents).toHaveBeenCalled();
  });

  // Testet das Logout der App Komponente
  it('logs out the user', async () => {
    const setAuthStatus = jest.fn();
    const setUser = jest.fn();

    await act(async () => {
      render(
        <AuthContext.Provider value={{ setAuthStatus, setUser, isAuthenticated: true }}>
          <App />
        </AuthContext.Provider>
      );
    });

    const logoutButton = screen.getByText(/Logout/i);

    fireEvent.click(logoutButton);

    await act(async () => {
      expect(setAuthStatus).toHaveBeenCalledWith(false);
      expect(setUser).toHaveBeenCalledWith(null);
    });

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
