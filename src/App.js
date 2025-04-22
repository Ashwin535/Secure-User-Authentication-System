// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm.js';
import OTPForm from './components/OTPForm.js';
import RegisterForm from './components/RegisterForm.js';
import RegisterPage from './pages/RegisterPage.js';
import EmailVerificationPage from './pages/EmailVerificationPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/verify-otp" element={<OTPForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/dashboard" element={<div>Welcome to Dashboard</div>} />
        <Route path="/verify-email/:token" element={<EmailVerificationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
