import React from 'react';
import { useHistory } from 'react-router';
import axios from '../../utils/axios';
import { parseDate } from '../../utils/parseDate';
import { useAsync } from '../../hooks/useAsync';
import { ItemList, Item } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';

interface Props {}

interface MoviePreview {
  id_movie: number;
  movie_title: string;
  movie_release: string;
  movie_duration: string;
  movie_img: string;
}

interface MoviePreviews extends Array<MoviePreview> {}

const Reservations: React.FC<Props> = () => {
  const history = useHistory();

  const movieSelectedHandler = (id: number) => {
    history.push('/movies/' + id);
  };

  const getReservations = (): Promise<MoviePreviews> => {
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

  const { status, value, error } = useAsync<MoviePreviews>(getReservations);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <ItemList>
            <ItemList.Return to="/dashboard">
              <FaArrowLeft />
            </ItemList.Return>
            <ItemList.Header>Reservations</ItemList.Header>
            <ItemList.Wrapper>
              {value.map((movie) => (
                <Item
                  movie
                  key={movie.id_movie}
                  onClick={() => movieSelectedHandler(movie.id_movie)}
                >
                  <Item.Image src={movie.movie_img} alt="movie-poster" />
                  <Item.Title>{movie.movie_title}</Item.Title>
                  <Item.Subtitle>
                    Release date: {parseDate(movie.movie_release)}
                  </Item.Subtitle>
                  <Item.Subtitle>
                    Duration: {movie.movie_duration} min
                  </Item.Subtitle>
                </Item>
              ))}
            </ItemList.Wrapper>
          </ItemList>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Reservations;
