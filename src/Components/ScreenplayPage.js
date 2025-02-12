import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Assets/Screenplay.css';

const ScreenplayPage = () => {
  const [screenplay, setScreenplay] = useState('');
  const [movies, setMovies] = useState([]);
  const apiKey = '91ed24161emsh9d7afe7dd11cd51p1d737fjsn6651035453c9';
  const apiUrl = 'https://imdb-top-100-movies.p.rapidapi.com/';

  useEffect(() => {
    const fetchMovies = async () => {
      if (screenplay.trim() === '') return;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
          },
        });

        // Filter movies based on the screenplay input
        const filteredMovies = response.data.filter((movie) =>
          movie.title.toLowerCase().includes(screenplay.toLowerCase())
        );

        // Limit the number of displayed movies to 8
        const limitedMovies = filteredMovies.slice(0, 8).map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.synopsis,
          poster_url: movie.image,
        }));

        setMovies(limitedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [screenplay, apiUrl, apiKey]);

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px' }}>
    <div className="screenplay-container">
      <h2>Describe Your Story</h2>
      <textarea
        value={screenplay}
        onChange={(e) => setScreenplay(e.target.value)}
        placeholder="Write your screenplay here..."
        rows="5"
        required
      />
      <div className="movies-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.overview}</p>
            </div>
          ))
        ) : (
          <p>No related movies found. Please describe your story in more detail.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ScreenplayPage;
