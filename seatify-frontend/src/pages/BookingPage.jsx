// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';



// function BookingPage() {
//   const { movieId } = useParams();
//   const navigate = useNavigate();
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   // Dummy movie list (used only to get movie title)
//   const movies = [
//     { id: '1', title: 'Avengers Endgame' },
//     { id: '2', title: 'Inception' },
//     { id: '3', title: 'Interstellar' }
//   ];

//   const movie = movies.find(m => m.id === movieId); // <- this was missing

//   const toggleSeat = (seatNumber) => {
//     if (selectedSeats.includes(seatNumber)) {
//       setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
//     } else {
//       setSelectedSeats([...selectedSeats, seatNumber]);
//     }
//   };

//   const handleConfirm = () => {
//     if (selectedSeats.length === 0) {
//       alert("Please select at least one seat!");
//       return;
//     }

//     navigate('/confirmation', {
//       state: {
//         movieId,
//         selectedSeats,
//         movieTitle: movie?.title || 'Movie', // if you’re passing title
//       }
//     });
    
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Booking Page for Movie: {movie?.title || 'Not Found'}</h2>

//       <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px', margin: '20px 0' }}>
//         {Array.from({ length: 30 }, (_, i) => i + 1).map((seat) => (
//           <button
//             key={seat}
//             onClick={() => toggleSeat(seat)}
//             style={{
//               width: '50px',
//               height: '50px',
//               margin: '5px',
//               backgroundColor: selectedSeats.includes(seat) ? 'green' : '#ccc',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer'
//             }}
//           >
//             {seat}
//           </button>
//         ))}
//       </div>

//       <button onClick={handleConfirm} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
//         Confirm Booking
//       </button>
//     </div>
//   );
// }

// export default BookingPage;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; 


function BookingPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // 🔍 Backend connectivity test on component mount
  axios.get("http://localhost:5000/")
  .then(res => console.log("✅ Backend Connected!", res.data))
  .catch(err => console.log("❌ Frontend is NOT connected to Backend", err));


  // Dummy movie list
  const movies = [
    { id: '1', title: 'Avengers Endgame' },
    { id: '2', title: 'Inception' },
    { id: '3', title: 'Interstellar' }
  ];

  const movie = movies.find(m => m.id === movieId);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }

    navigate('/confirmation', {
      state: {
        movieId,
        selectedSeats,
        movieTitle: movie?.title || 'Movie',
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Booking Page for Movie: {movie?.title || 'Not Found'}</h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: '300px',
        margin: '20px 0'
      }}>
        {Array.from({ length: 30 }, (_, i) => i + 1).map((seat) => (
          <button
            key={seat}
            onClick={() => toggleSeat(seat)}
            style={{
              width: '50px',
              height: '50px',
              margin: '5px',
              backgroundColor: selectedSeats.includes(seat) ? 'green' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {seat}
          </button>
        ))}
      </div>

      <button onClick={handleConfirm} style={{
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}>
        Confirm Booking
      </button>
    </div>
  );
}

export default BookingPage;
