import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { ItemList, Item } from '../../components';
import { parseDate } from '../../utils/parseDate';
import { FaArrowLeft } from 'react-icons/fa';

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
          <ItemList>
            <ItemList.Return to="/dashboard">
              <FaArrowLeft />
            </ItemList.Return>
            <ItemList.Header>Movies</ItemList.Header>
            <ItemList.Wrapper>
              {/*@ts-ignore*/}
              {value.map((movie) => (
                <Item
                  key={movie.id_movie}
                  onClick={() => postSelectedHandler(movie.id_movie)}
                >
                  <Item.Image src={movie.movie_img} alt="movie-poster" />
                  <Item.Title>{movie.movie_title}</Item.Title>
                  <Item.Subtitle>
                    Release date: {parseDate(movie.movie_release)}
                  </Item.Subtitle>
                  <Item.Subtitle>
                    Duration: {movie.movie_duration}
                  </Item.Subtitle>
                </Item>
              ))}
            </ItemList.Wrapper>
          </ItemList>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Movies;
