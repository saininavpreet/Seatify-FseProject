import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please enter both name and email");
      return;
    }

    // Save user to localStorage (optional for persistence)
    localStorage.setItem("user", JSON.stringify({ name, email }));

    // Login the user via context
    login({ name, email });

    // Redirect to homepage or dashboard
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
