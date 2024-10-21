import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import SearchPage from "./pages/SearchPage";
import VerifyEmail from './auth/verifyEmail';

const App: React.FC = () => {
  const location = useLocation();

  // Conditionally show Navbar on specified routes
  const showNavbar = () => {
    const navbarRoutes = ['/', '/profile', '/search'];
    return navbarRoutes.some(route => location.pathname.startsWith(route)) || location.pathname === '*';
  };

  return (
    <>
      <Toaster />
      {showNavbar() && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:text" element={<SearchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;