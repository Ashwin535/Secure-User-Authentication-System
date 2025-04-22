// src/pages/EmailVerificationPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/auth/verify-email/${token}`);
        setStatus(response.data.message || 'Email verified successfully!');
      } catch (err) {
        setStatus('Invalid or expired verification link.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>{status}</h2>
    </div>
  );
};

export default EmailVerificationPage;
