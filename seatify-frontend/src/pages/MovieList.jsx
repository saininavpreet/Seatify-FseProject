import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyMovies = [
  {
    id: 1,
    title: 'Avengers: Endgame',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg',
  },
  {
    id: 2,
    title: 'Inception',
    posterUrl: 'https://m.media-amazon.com/images/I/61gz2gcfkAL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 3,
    title: 'Interstellar',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
  },
  {
    id: 4,
    title: 'The Dark Knight',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg',
  },
];

function MovieList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredMovies = dummyMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (movie) => {
    navigate('/booking', { state: { movieTitle: movie.title } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>🎬 Available Movies</h2>

      <input
        type="text"
        placeholder="Search by movie title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              width: '200px',
              padding: '10px',
              textAlign: 'center',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h4 style={{ margin: '10px 0' }}>{movie.title}</h4>
            <button
              onClick={() => handleBookNow(movie)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
