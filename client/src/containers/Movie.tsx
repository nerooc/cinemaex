import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import axios from '../utils/axios';

interface Props {
  setAuth: (boolean: Boolean) => void;
}

interface Params {
  id: string;
}

interface Movie {
  id_movie: number;
  movie_description: string;
  movie_duration: string;
  movie_img: string;
  movie_release: string;
  movie_title: string;
  director_name: string;
  director_surname: string;
}

const Movie: React.FC<Props> = ({ setAuth }) => {
  const params: Params = useParams();

  const getMovie = (): Promise<Movie> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/movies/' + params.id, {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<Movie>(getMovie);

  console.log(value);
  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return (
          <>
            <h1>Movie</h1>

            {/* @ts-ignore */}
            <p>{value.movie_title}</p>
            {/* @ts-ignore */}
            <p>{value.movie_description}</p>

            <p>
              {/* @ts-ignore */}
              {value.director_name} {value.director_surname}
            </p>

            <Link to="/movies">
              <button>Back to movies</button>
            </Link>
          </>
        );
    }
  };

  return <>{renderSwitch(status)}</>;
};

export default Movie;
