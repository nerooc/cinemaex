import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAsync } from '../hooks/useAsync';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

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
  const history = useHistory();

  const postSelectedHandler = (id: number) => {
    history.push('/movies/' + id);
  };

  const getMovies = (): Promise<MoviePreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/movies', {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  const { execute, status, value, error } = useAsync<MoviePreviews>(getMovies);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return (
          <>
            <h1>Movies</h1>
            {/*@ts-ignore*/}
            {value.map((movie) => (
              <div
                key={movie.id_movie}
                onClick={() => postSelectedHandler(movie.id_movie)}
              >
                <p>{movie.movie_title}</p>
                <img
                  width="200px"
                  height="300px"
                  src={movie.movie_img}
                  alt="movie-poster"
                />
              </div>
            ))}

            <Link to="/dashboard">Back to dashboard</Link>
          </>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Movies;
