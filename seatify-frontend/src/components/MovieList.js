import React from 'react';
import MovieList from '../components/MovieList';

function HomePage() {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Now Showing</h2>
      <MovieList />
    </div>
  );
}

export default HomePage;