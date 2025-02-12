// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import '../Assets/MovieGrid.css';
// import MovieDetailsModal from './MovieDetailsModal';
// import Popularseries from './Popularseries';
// import MovieList from './MovieList';

// const MovieCard = ({ movie, onClick }) => (
//   <div className="movie-card1" onClick={() => onClick(movie)} style={{ cursor: 'pointer' }}>
//     <img src={movie.poster} alt={movie.title} />
//   </div>
// );

// const TopRated = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMovie, setSelectedMovie] = useState(null);

//   useEffect(() => {
//     fetchMovies();
//   }, []);

//   const fetchMovies = async () => {
//     const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
//     const options = {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-key': '91ed24161emsh9d7afe7dd11cd51p1d737fjsn6651035453c9',
//         'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       console.log(response); // Log the full response object for debugging

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log(data); // Log data to confirm the structure and content

//       setMovies(data || []); // Set movies only if data exists, fallback to empty array
//     } catch (error) {
//       console.error(`Failed to fetch movies: ${error.message}`);
//       setError(`Failed to fetch movies: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const handleMovieClick = (movie) => {
//     setSelectedMovie(movie);
//   };

//   const handleCloseModal = () => {
//     setSelectedMovie(null);
//   };

//   const settings = {
//     infinite: true,
//     speed: 300,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="bodycar">
//       <div className="movie-slider-container">
//         <h3 className="page-title">Top Rated</h3>
//         {loading && <p>Loading...</p>}
//         {error && <p>Error: {error}</p>}
//         <div className="movie-slider">
//           <Slider {...settings}>
//             {movies.map((movie) => (
//               <MovieCard
//                 key={movie.id}
//                 movie={{ 
//                   id: movie.id, 
//                   title: movie.title, 
//                   poster: movie.image, 
//                   rating: movie.rating 
//                 }}
//                 onClick={handleMovieClick} // Ensure onClick is passed
//               />
//             ))}
//           </Slider>
//         </div>
//       </div>
//       <Popularseries />
//       <MovieList />
//       {selectedMovie && (
//         <MovieDetailsModal 
//           movie={selectedMovie} 
//           onClose={handleCloseModal} 
//         />
//       )}
//     </div>
//   );
// };

// export default TopRated;
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import '../Assets/MovieGrid.css';
import MovieDetailsModal from './MovieDetailsModal';
import Popularseries from './Popularseries';
import MovieList from './MovieList';

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card1" onClick={() => onClick(movie)} style={{ cursor: 'pointer' }}>
    <img src={movie.poster} alt={movie.title} />
  </div>
);

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '91ed24161emsh9d7afe7dd11cd51p1d737fjsn6651035453c9',
        'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      console.log(response); // Log the full response object for debugging

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log data to confirm the structure and content

      // Ensure data is an array before setting it to movies
      setMovies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(`Failed to fetch movies: ${error.message}`);
      setError(`Failed to fetch movies: ${error.message}`);
    } finally {
      setLoading(false);
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
        <h3 className="page-title">Top Rated</h3>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="movie-slider">
          <Slider {...settings}>
            {Array.isArray(movies) && movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={{ 
                  id: movie.id, 
                  title: movie.title, 
                  poster: movie.image, 
                  rating: movie.rating 
                }}
                onClick={handleMovieClick} // Ensure onClick is passed
              />
            ))}
          </Slider>
        </div>
      </div>
      <Popularseries movies={movies} /> {/* Pass movies explicitly if required */}
      <MovieList />
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default TopRated;
