// src/components/LoginForm.js
import { useState } from 'react';
import { login, register, verifyOTP } from '../api.js';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setMsg(res.data.message);
      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <p>{msg}</p>
    </form>
  );
};

export default LoginForm;
