import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/verifyEmail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <>
        <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </>
    </BrowserRouter>
  );
};

export default App;
