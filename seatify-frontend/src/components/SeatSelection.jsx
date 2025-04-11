import React, { useState } from 'react';

const SeatSelection = ({ selectedSeats, setSelectedSeats }) => {
  const totalSeats = 30; // total seats in the hall
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div>
      <h3>Select Your Seats:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px' }}>
        {seats.map((seat) => (
          <div
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              width: '40px',
              height: '40px',
              margin: '5px',
              lineHeight: '40px',
              textAlign: 'center',
              border: '1px solid #000',
              backgroundColor: selectedSeats.includes(seat) ? 'green' : 'lightgray',
              cursor: 'pointer',
              borderRadius: '5px',
            }}
          >
            {seat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;