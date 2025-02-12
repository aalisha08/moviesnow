
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../Assets/MovieGrid.css';
import MovieDetailsModal from './MovieDetailsModal';

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card1" onClick={() => onClick(movie)}>
    <img src={movie.image || movie.poster || ''} alt={movie.title} /> {/* Adjust 'movie.image' based on API */}
  </div>
);

const Popularseries = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/series/';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '91ed24161emsh9d7afe7dd11cd51p1d737fjsn6651035453c9',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      // Confirm data structure and update movies state with an array
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bodycar">
      <div className="movie-slider-container">
        <h3 className="page-title">Popular Series</h3>
        <div className="movie-slider">
          <Slider {...settings}>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
            ))}
          </Slider>
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default Popularseries;
