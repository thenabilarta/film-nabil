import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function LandingPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const endpoint = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=95502be247ee6b44375264319db09d7f&language=en-US&page=${page}`
      );
      setMovies(endpoint);
    };
    fetchMovies();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="landing-page">
      {movies.data && (
        <div
          className="backdrop"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%), 
            url(http://image.tmdb.org/t/p/w1280${movies.data.results[0].backdrop_path}), 
            #1c1c1c`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center, center',
            width: '100%',
            height: '500px',
            position: 'relative',
          }}
        >
          <h3
            style={{
              position: 'absolute',
              color: 'white',
              fontSize: '4rem',
              top: '30%',
              left: '10%',
            }}
          >
            {movies.data.results[0].title}
          </h3>
          <p
            style={{
              position: 'absolute',
              color: 'white',
              fontSize: '1rem',
              top: '50%',
              left: '10%',
              width: '30%',
            }}
          >
            {movies.data.results[0].overview}
          </p>
        </div>
      )}
      <ul className="movie-list">
        {movies.data &&
          movies.data.results.map((poster) => (
            <li key={poster.id}>
              <Link to={`/movie/${poster.id}`}>
                <img
                  style={{height: '300px'}}
                  src={`http://image.tmdb.org/t/p/w500${poster.poster_path}`}
                  alt=""
                />
              </Link>
            </li>
          ))}
      </ul>
      <div className="pagination">
        <p onClick={() => setPage(page - 1)}>{page > 1 ? page - 1 : null}</p>
        <p style={{fontWeight: 'bold', fontSize: '20px'}}>{page}</p>
        <p onClick={() => setPage(page + 1)}>{page + 1}</p>
      </div>
    </div>
  );
}

export default LandingPage;
