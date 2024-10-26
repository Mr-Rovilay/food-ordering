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
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './components/Cart';
import Restaurant from './admin/Restaurant';
import AddMenu from './admin/AddMenu';
import Orders from './admin/Orders';
import Success from './components/Success';


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
      {/* <div className="bg-[#f9f9f9] text-[#404040]"> */}

      {showNavbar() && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:text" element={<SearchPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order/status" element={<Success />} />
        {/* admin */}
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/admin/restaurant" element={<Restaurant />} />
        <Route path="/admin/menu" element={<AddMenu />} />
        <Route path="/admin/orders" element={<Orders />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* </div> */}
    </>
  );
};

export default App;