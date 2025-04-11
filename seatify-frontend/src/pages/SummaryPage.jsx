import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Booking Summary</h2>
        <p>No booking data found. Please make a booking first.</p>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  const { movieTitle, selectedSeats, userName, email } = bookingData;

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>🎉 Booking Summary</h2>

      <p><strong>🎬 Movie:</strong> {movieTitle}</p>
      <p><strong>💺 Seats:</strong> {selectedSeats?.join(', ')}</p>
      <p><strong>👤 Name:</strong> {userName}</p>
      <p><strong>📧 Email:</strong> {email}</p>

      <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Go to Home
      </button>
    </div>
  );
}

export default SummaryPage;
