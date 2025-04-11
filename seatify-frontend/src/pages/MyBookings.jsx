import React, { useEffect, useState } from 'react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);
  }, []);

  const handleCancel = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1); // remove the booking at index
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
  };

  if (bookings.length === 0) {
    return <h2 style={{ padding: '20px' }}>No bookings found.</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>🎟️ My Bookings</h2>
      {bookings.map((booking, index) => (
        <div
          key={index}
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '15px',
            margin: '10px 0',
            backgroundColor: '#f9f9f9',
          }}
        >
          <p><strong>🎬 Movie:</strong> {booking.movieTitle}</p>
          {/* <p><strong>💺 Seats:</strong> {booking.selectedSeats.join(', ')}</p> */}
          <p><strong>💺 Seats:</strong> {Array.isArray(booking.selectedSeats) ? booking.selectedSeats.join(', ') : 'N/A'}</p>

          <p><strong>👤 Name:</strong> {booking.userName}</p>
          <p><strong>📧 Email:</strong> {booking.email}</p>
          <p><strong>🕒 Time:</strong> {booking.time}</p>
          
          <button
            onClick={() => handleCancel(index)}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            ❌ Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
