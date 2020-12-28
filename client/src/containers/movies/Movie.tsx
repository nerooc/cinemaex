import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import { parseDate } from '../../utils/parseDate';
import { useAsync } from '../../hooks/useAsync';
import { FullItem } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';
import * as ROUTES from '../../constants/routes';

interface Props {}

interface Params {
  id: string;
}

interface IMovie {
  id_movie: number;
  movie_description: string;
  movie_duration: string;
  movie_img: string;
  movie_release: string;
  movie_title: string;
  director_name: string;
  director_surname: string;
}

const Movie: React.FC<Props> = () => {
  const params: Params = useParams();

  const getMovie = (): Promise<IMovie> => {
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

  const { status, value, error } = useAsync<IMovie>(getMovie);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <FullItem>
            <FullItem.Wrapper>
              <FullItem.Return to={ROUTES.MOVIES}>
                <FaArrowLeft />
              </FullItem.Return>
              <FullItem.Text>
                <FullItem.Header>{value?.movie_title}</FullItem.Header>
                <FullItem.AdditionalInfo>
                  <FullItem.Info>
                    Release: {parseDate(value?.movie_release)}
                  </FullItem.Info>
                  <FullItem.Info>
                    Duration: {value?.movie_duration} min
                  </FullItem.Info>
                  <FullItem.Info>
                    Director: {value?.director_name} {value?.director_surname}
                  </FullItem.Info>
                </FullItem.AdditionalInfo>
                <FullItem.Description>
                  {value?.movie_description}
                </FullItem.Description>
              </FullItem.Text>
              <FullItem.Image src={value?.movie_img} alt="movie-poster" />
            </FullItem.Wrapper>
          </FullItem>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };

  return <>{renderSwitch(status)}</>;
};

export default Movie;
