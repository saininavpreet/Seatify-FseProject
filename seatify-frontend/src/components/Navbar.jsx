import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', background: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2 style={{ display: 'inline' }}>🎟️ Seatify</h2>
        <Link to="/" style={{ color: '#fff', marginLeft: '20px' }}>Home</Link>
        <Link to="/my-bookings" style={{ color: '#fff', marginLeft: '20px' }}>My Bookings</Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>👤 {user.name}</span>
            <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', marginRight: '10px' }}>Login</Link>
            <Link to="/signup" style={{ color: '#fff' }}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
