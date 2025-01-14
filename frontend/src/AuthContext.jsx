// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session
    const checkAuth = () => {
      const storedEmail = localStorage.getItem("email");
      const storedIsAuthenticated = localStorage.getItem("isAuthenticated");

      if (storedIsAuthenticated === "true" && storedEmail) {
        setIsAuthenticated(true);
        setUser({ email: storedEmail });
      }
      setIsInitialized(true);
    };

    checkAuth();
  }, []);

  const login = (email, password) => {
    const fakeEmail = "demo_user@innosquares.com";
    const fakePassword = "64Squares@012";

    if (email === fakeEmail && password === fakePassword) {
      setIsAuthenticated(true);
      setUser({ email });

      localStorage.setItem("email", email);
      localStorage.setItem("isAuthenticated", "true");
      return true;
    } else {
      alert("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);

    localStorage.removeItem("email");
    localStorage.removeItem("isAuthenticated");
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
