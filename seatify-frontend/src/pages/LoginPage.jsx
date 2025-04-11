import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email) {
      login(storedUser);
      navigate('/');
    } else {
      alert("User not found. Please sign up first.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
