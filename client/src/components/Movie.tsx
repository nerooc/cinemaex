import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
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

interface Movie {
  movie_title: string;
  movie_release: string;
  movie_duration: string;
  movie_img: string;
}

interface Params {
  id: string;
}

const Movies: React.FC<Props> = ({ setAuth }) => {
  const params: Params = useParams();
  const [movie, setMovie] = useState<Movie>();
  const [ready, setReady] = useState<boolean>(false);

  async function getMovie() {
    try {
      const response = await axios.get('/movies/' + params.id, {
        headers: {
          token: localStorage.token,
        },
      });

      setMovie(response.data);
      setReady(true);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  useEffect(() => {
    getMovie();
  }, []);

  return !ready ? (
    <p>Loading post...</p>
  ) : (
    <>
      <h1>Movie</h1>
      {/* 
            // @ts-ignore */}
      <p>{movie.movie_title}</p>
      {/* 
            // @ts-ignore */}
      <p>{movie.movie_description}</p>

      <Link to="/movies">
        <button>Back to movies</button>
      </Link>
    </>
  );
};

export default Movies;
