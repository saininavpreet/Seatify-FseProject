import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieTitle, selectedSeats } = location.state || {};

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  const handleFinalConfirm = async () => {
    if (!userName || !email) {
      alert("Please fill out your name and email.");
      return;
    }

    const newBooking = {
      movieTitle,
      selectedSeats,
      userName,
      email,
      time: new Date().toLocaleString()
    };

    try {
      // ✅ Send booking data to backend to trigger mail
      await axios.post("/bookings", {
        name: userName,
        email: email,
        user_id: 1,
        show_id: 101,
        total_price: selectedSeats.length * 120
      });
      
      

      console.log("✅ Booking response:", response.data);

      // ✅ Also store locally
      const existing = JSON.parse(localStorage.getItem('bookings')) || [];
      localStorage.setItem('bookings', JSON.stringify([...existing, newBooking]));

      navigate('/summary', { state: newBooking });

    } catch (err) {
      console.error("❌ Booking failed:", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!movieTitle || !selectedSeats) {
    return <h2 style={{ padding: '20px' }}>Invalid booking data. Please go back and try again.</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Confirm Your Booking</h2>

      <p><strong>🎬 Movie:</strong> {movieTitle}</p>
      <p><strong>💺 Seats:</strong> {selectedSeats.join(', ')}</p>

      <div style={{ marginTop: '30px' }}>
        <label style={{ display: 'block', marginBottom: '10px' }}>
          👤 Your Name:
          <input
            type="text"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: '20px' }}>
          📧 Email:
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </label>

        <button
          onClick={handleFinalConfirm}
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          ✅ Final Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;
