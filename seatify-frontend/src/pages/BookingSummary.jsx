import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, selectedSeats } = location.state || {};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Booking Summary</h2>
      <p><strong>Movie ID:</strong> {movieId}</p>
      <p><strong>Selected Seats:</strong> {selectedSeats?.join(', ') || 'None'}</p>
      <button onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default BookingSummary;