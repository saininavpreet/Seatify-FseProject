import React from 'react';
import './MovieCard.css';
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      <div className="movie-title">{movie.title}</div>
    </div>
  );
}

export default MovieCard;
