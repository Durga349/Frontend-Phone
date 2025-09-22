import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/Login";
import OtpVerification from "./pages/otpverification/OtpVerification";
import Dashboard from "./pages/dashboard/Dashboard";

const Pageroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default Pageroutes;
