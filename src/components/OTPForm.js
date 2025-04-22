// src/components/OTPForm.js
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, register, verifyOTP } from '../api.js';
import './OTPForm.css';



const OTPForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/verify-otp', { email: state.email, otp });
      localStorage.setItem('token', res.data.token);
      setMsg('Success! You are logged in.');
      navigate('/dashboard');
    } catch (err) {
      setMsg(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <form onSubmit={handleVerify}>
      <h2>Enter OTP</h2>
      <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" required />
      <button type="submit">Verify</button>
      <p>{msg}</p>
    </form>
  );
};

export default OTPForm;
