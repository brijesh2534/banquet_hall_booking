import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';

// --- Helper function to manage axios headers ---
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// --- Type Definitions ---
interface User { id: string; fullName: string; email: string; }
interface AuthState { token: string | null; isAuthenticated: boolean; loading: boolean; user: User | null; }
interface AuthContextType extends AuthState { login: (token: string) => void; logout: () => void; }

// --- Reducer ---
const authReducer = (state: AuthState, action: { type: string; payload?: any }): AuthState => {
  switch (action.type) {
    case 'USER_LOADED':
      return { ...state, isAuthenticated: true, loading: false, user: action.payload };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return { ...state, token: action.payload.token, loading: true }; // Set loading to true while we fetch the user
    case 'AUTH_ERROR':
    case 'LOGOUT':
      localStorage.removeItem('token');
      setAuthToken(null);
      return { ...state, token: null, isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

// --- Context and Provider ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AuthState = { token: localStorage.getItem('token'), isAuthenticated: false, loading: true, user: null };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user data if a token is found on initial app load
  useEffect(() => {
    const loadUserOnMount = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get('/api/auth');
          dispatch({ type: 'USER_LOADED', payload: res.data });
        } catch (err) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        // Explicitly set loading to false if there's no token
        dispatch({ type: 'AUTH_ERROR' });
      }
    };
    loadUserOnMount();
  }, []);

  // Login function
  const login = async (token: string) => {
    dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
    // After setting the token, immediately try to load user data
    setAuthToken(token);
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};