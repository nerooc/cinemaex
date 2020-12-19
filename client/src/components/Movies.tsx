import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import axios from '../utils/axios';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';

interface Props {
  setAuth: (boolean: Boolean) => void;
}

interface MoviePreview {
  id_movie: number;
  movie_title: string;
  movie_release: string;
  movie_duration: string;
  movie_img: string;
}

interface MoviePreviews extends Array<MoviePreview> {}

const Movies: React.FC<Props> = ({ setAuth }) => {
  const [movies, setMovies] = useState<MoviePreviews>([]);
  const history = useHistory();

  const postSelectedHandler = (id: number) => {
    history.push('/movies/' + id);
  };

  async function getMovies() {
    try {
      const response = await axios.get('/movies', {
        headers: {
          token: localStorage.token,
        },
      });

      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <h1>Movies</h1>
      {movies.map((movie) => (
        <div
          key={movie.id_movie}
          onClick={() => postSelectedHandler(movie.id_movie)}
        >
          <p>{movie.movie_title}</p>
          <img
            width="200px"
            height="300px"
            src={movie.movie_img}
            alt="movie-image"
          />
        </div>
      ))}
    </>
  );
};

export default Movies;
