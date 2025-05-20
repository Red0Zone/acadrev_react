// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';


// 1. Create the Context
const AuthContext = createContext(null);

// Constants for local storage keys
const STORAGE_KEYS = {
  USER: 'authUser',
  TOKEN: 'authToken',
};

// API configuration
const API_CONFIG = {
   BASE_URL: /*process.env.REACT_APP_API_URL ||*/ 'http://localhost:3000',
  ENDPOINTS: {
    LOGIN: '/auth/login'
    // REGISTER: '/auth/register',
    // VERIFY: '/auth/verify',
    // LOGOUT: '/auth/logout',
  },
};

// Roles dictionary
const roles = {
  ADMIN: 'admin',
  AUTHORITY: 'authority',
  UNIVERSITY: 'university',
  COLLEGE: 'college',
  DEPARTMENT: 'department'
};




// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user data if logged in, null otherwise
  const [isLoading, setIsLoading] = useState(true); // To handle initial auth check
  const [error, setError] = useState(null); // Optional: state to hold login errors

  // Simulate checking auth status on initial load (e.g., from localStorage or an API)
  useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      if (storedUser) {
        try {
          // Optional: You might want to verify the token/user with the backend here too
          // For example: await fetch('/api/auth/verify');
          setUser(JSON.parse(storedUser));
          console.log(`check one here : ${storedUser}}`);
        } catch (error) {
          console.error("Failed to parse stored user data or verify token:", error);
          localStorage.removeItem(STORAGE_KEYS.USER);
          localStorage.removeItem(STORAGE_KEYS.TOKEN); // Clear invalid data
          setUser(null);
        }
      }
      setIsLoading(false); // Finished loading initial auth state
    };

    checkAuthStatus();
  }, []);

  // Login function - now accepts credentials and fetches from API using Fetch
  const login = async (credentials) => {
    // credentials could be an object like { email, password }
    setError(null); // Clear previous errors
    setIsLoading(true); // Indicate loading state during login attempt

    try {
      const response = await fetch(API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      const userData = data.user;
      const token = data.token;
     
    

      if (userData) {
        setUser(userData);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData)); // Persist user data
        localStorage.setItem(STORAGE_KEYS.TOKEN, token); // Persist token
        setError(null); // Clear error on successful login
        console.log("User logged in:", userData);
        setIsLoading(false);
        
        return { success: true, user: userData }; // Indicate success
      } else {
        throw new Error("Login successful but no user data received.");
      }

    } catch (err) {
      console.error("Login failed:", err.message);
      setError(err.message || 'Network error or server issue');
      setUser(null); // Ensure user is null on failed login
      localStorage.removeItem(STORAGE_KEYS.USER); // Clear any potentially stale data
      localStorage.removeItem(STORAGE_KEYS.TOKEN); // Clear token as well
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  // Logout function
  const logout = async () => {
    // Optional: Inform the backend about logout if needed (e.g., invalidate token)
    // try {
    //   await fetch('https://your-api.com/api/auth/logout', { method: 'POST' });
    // } catch (err) {
    //   console.error("Failed to notify server of logout:", err);
    // }

    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER); // Clear persisted data
    setError(null); // Clear any previous errors
    console.log("User logged out");
    localStorage.removeItem(STORAGE_KEYS.TOKEN); // Clear token as well
    // You might want to redirect the user to the login page here
  };

  
 useEffect(() => {
    if (isLoading) {
      document.title = "Loading... ";
    } else if (user) {
      document.title = `${user.role} `;
    } else {
      document.title = " Login";
    }
  }, [user, isLoading]); // Dependency array ensures this runs when these values change

  // The value provided to consuming components
  const value = {
    user,
    isLoggedIn: !!user, // Boolean flag: true if user object exists, false otherwise
    isLoading, // Provide loading state
    error, // Provide error state
    login,
    logout,
    roles, // Include the roles dictionary
  };

  // Render children (consider showing a loading indicator during initial load)
  // You might want a more sophisticated loading screen than just hiding children
  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Or conditionally render a loading spinner: isLoading ? <LoadingSpinner /> : children */}
    </AuthContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
