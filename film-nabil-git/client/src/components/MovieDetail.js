import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

function MovieDetail(props) {
  const id = props.match.params.id;

  let user = useSelector((state) => state.user);

  const [movieDetails, setMovieDetails] = useState({});
  const [komentar, setKomentar] = useState('');
  const [comentar, setComentar] = useState({});

  async function fetchData() {
    const komen = await axios.post('/api/comment/getcomments', {id: id});
    setComentar(komen);
  }

  useEffect(() => {
    const fetchDetailInfo = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=95502be247ee6b44375264319db09d7f&language=en-US`
      );
      setMovieDetails(response);
    };
    fetchDetailInfo();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: komentar,
      writer: user.userData._id,
      postId: id,
      date: Date().slice(0, 15),
    };

    console.log(variables);

    axios.post('/api/comment/savecomment', variables).then((response) => {
      fetchData().then((document.getElementById('komentar').value = ''));
    });
  };

  return (
    <div className="movie-detail">
      {movieDetails.data && (
        <div className="main-movie-detail">
          <div
            className="backdrop"
            style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0)
              39%,rgba(0,0,0,0)
              41%,rgba(0,0,0,0.65)
              100%),
              url(http://image.tmdb.org/t/p/w1280${movieDetails.data.backdrop_path})
              ,#1c1c1c`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center, center',
              width: '100%',
              height: '500px',
            }}
          />
          <div className="movie-card">
            <ul>
              <li>
                <label htmlFor="title">Title</label>
                <p name="title">{movieDetails.data.title}</p>
              </li>
              <li>
                <label htmlFor="overview">Overview</label>
                <p name="overview">{movieDetails.data.overview}</p>
              </li>
              <li>
                <label htmlFor="popularity">Popularity</label>
                <p name="popularity">{movieDetails.data.popularity}</p>
              </li>
              <li>
                <label htmlFor="release_date">Release Date</label>
                <p name="release_date">{movieDetails.data.release_date}</p>
              </li>
              <li>
                <label htmlFor="vote_average">Vote Average</label>
                <p name="vote_average">{movieDetails.data.vote_average}</p>
              </li>
              <li>
                <label htmlFor="vote_count">Vote Count</label>
                <p name="vote_count">{movieDetails.data.vote_count}</p>
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="main-review">
        <div className="main-review-detail">
          <h1 className="title">
            Review {movieDetails.data && movieDetails.data.title} - Nabil Film
          </h1>
          {comentar.data && comentar.data.length === 0 && (
            <p style={{textAlign: 'center'}}>Belum ada review untuk film ini</p>
          )}
          <div className="main-comment">
            {comentar.data &&
              comentar.data.map((com) => (
                <div className="main-comment-content" key={com.writer._id}>
                  <img src={com.writer.image} alt="" />
                  <div className="main-comment-content-text">
                    <h3 style={{textTransform: 'capitalize'}}>
                      {com.writer.name}
                    </h3>
                    <p style={{opacity: '.4'}}>
                      {com.date === Date().slice(0, 15) ? 'Hari ini' : com.date}
                    </p>
                    <p>{com.content}</p>
                  </div>
                </div>
              ))}
            <form onSubmit={onSubmit}>
              {user.userData && !user.userData.isAuth ? (
                <p style={{padding: '1rem', fontStyle: 'italic'}}>
                  Login untuk review
                </p>
              ) : (
                <React.Fragment>
                  <img
                    style={{opacity: '.6'}}
                    src={user.userData && user.userData.image}
                    alt=""
                  />
                  <div className="main-comment-form">
                    <h3 style={{opacity: '.4', textTransform: 'capitalize'}}>
                      {user.userData && user.userData.name}
                    </h3>
                    <p style={{opacity: '.4'}}>{Date().slice(0, 15)}</p>
                    <div className="input-text">
                      <input
                        type="text"
                        name="komentar"
                        id="komentar"
                        placeholder="tulis review disini"
                        onChange={(e) => setKomentar(e.target.value)}
                      ></input>
                      <button
                        type="submit"
                        disabled={user.userData && !user.userData.isAuth}
                      >
                        kirim
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
