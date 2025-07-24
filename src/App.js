import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ChatBox from "./components/ChatBox"; // ✅ your actual ChatBox
import MainLayout from "./components/MainLayout";
import { AuthProvider } from "./components/AuthContext";
import './index.css';

// ✅ PrivateRoute Wrapper
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
<Routes>
  <Route
    path="/login"
    element={<Login onLogin={() => localStorage.setItem("isLoggedIn", "true")} />}
  />
  <Route
    path="/chat"
    element={
      <PrivateRoute>
        <MainLayout onLogout={() => localStorage.removeItem("isLoggedIn")} />
      </PrivateRoute>
    }
  >
    <Route index element={<ChatBox />} />
  </Route>

  {/* fallback */}
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
