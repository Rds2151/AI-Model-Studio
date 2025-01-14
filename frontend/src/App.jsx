// App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";
import { useState, useEffect } from "react";

import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import AIDetection from "./pages/Models/AIDetection";
import GrammarPro from "./pages/Models/GrammarPro";
import OutputValidator from "./pages/Models/OutputValidator";
import SimilaritySearch from "./pages/Models/SimilaritySearch";
import ImageQa from "./pages/Models/ImageQa";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure authentication state is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Add your loading spinner/component here
  }

  return (
    <ThemeProvider>
      <div className={`${isAuthenticated ? "flex h-screen" : "h-screen"}`}>
        {isAuthenticated && <Sidebar />}
        <div className="flex-initial overflow-y-auto h-screen w-full">
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login className="w-[200vw]" />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/models/ai-detection"
              element={
                <ProtectedRoute>
                  <AIDetection />
                </ProtectedRoute>
              }
            />
            <Route
              path="/models/grammar-pro"
              element={
                <ProtectedRoute>
                  <GrammarPro />
                </ProtectedRoute>
              }
            />
            <Route
              path="/models/output-validator"
              element={
                <ProtectedRoute>
                  <OutputValidator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/models/similarity-search"
              element={
                <ProtectedRoute>
                  <SimilaritySearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/models/image-qa"
              element={
                <ProtectedRoute>
                  <ImageQa />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
