import React from 'react';
import MovieCard from '../components/MovieCard';
import './HomePage.css';


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
];

function HomePage() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Now Showing</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {dummyMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
// function HomePage() {
//   return (
//     <div className="homepage">
//       <h2 className="homepage-title">Now Showing</h2>
//       <div className="movie-grid">
//         {dummyMovies.map((movie) => (
//           <MovieCard key={movie.id} movie={movie} />
//         ))}
//       </div>
//     </div>
//   );
// }




export default HomePage;