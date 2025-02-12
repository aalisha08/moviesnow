
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Assets/MovieList.css';

const RAPIDAPI_URL = 'https://imdb-top-100-movies.p.rapidapi.com/';
const RAPIDAPI_OPTIONS = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '91ed24161emsh9d7afe7dd11cd51p1d737fjsn6651035453c9',
    'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
  }
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [addedMovies, setAddedMovies] = useState([]);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(RAPIDAPI_URL, RAPIDAPI_OPTIONS);
        const data = response.data;
        setMovies(Array.isArray(data) ? data.slice(0, 15) : []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    const savedMovies = JSON.parse(localStorage.getItem('addedMovies')) || [];
    setAddedMovies(Array.isArray(savedMovies) ? savedMovies : []);

    fetchMovies();
  }, []);

  const addToMovieList = (movie) => {
    const updatedAddedMovies = [...addedMovies, movie];
    setAddedMovies(updatedAddedMovies);
    localStorage.setItem('addedMovies', JSON.stringify(updatedAddedMovies));
    navigate('/lists'); // Navigate to the SelectedMovies page
  };

  return (
   
    <div className='scroll'>
      <h2 className='h2title'>Classics</h2>
      <div className="movie-list-container">
        {Array.isArray(movies) && movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={movie.image ? movie.image : 'default_image_url'}
              alt={movie.title}
              className="movie-image"
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>⭐ {movie.rating || 'N/A'}</p>
              <button 
                className="add-to-list-btn"
                onClick={() => addToMovieList(movie)}
                disabled={addedMovies.some((m) => m.id === movie.id)}
              >
                {addedMovies.some((m) => m.id === movie.id) ? 'Added' : 'Add to List'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
   
  );
};

export default MovieList;
