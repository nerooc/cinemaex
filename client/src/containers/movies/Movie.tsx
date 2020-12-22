import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';
import { FullItem } from '../../components';
import { parseDate } from '../../utils/parseDate';
import { FaArrowLeft } from 'react-icons/fa';

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
          <FullItem>
            <FullItem.Wrapper>
              <FullItem.Return to="/movies">
                <FaArrowLeft />
              </FullItem.Return>
              <FullItem.Text>
                {/* @ts-ignore */}
                <FullItem.Header>{value.movie_title}</FullItem.Header>
                <FullItem.AdditionalInfo>
                  <FullItem.Info>
                    {/* @ts-ignore */}
                    Release: {parseDate(value.movie_release)}
                  </FullItem.Info>
                  <FullItem.Info>
                    {/* @ts-ignore */}
                    Duration: {value.movie_duration} min
                  </FullItem.Info>
                  <FullItem.Info>
                    {/* @ts-ignore */}
                    Director: {value.director_name} {value.director_surname}
                  </FullItem.Info>
                </FullItem.AdditionalInfo>
                <FullItem.Description>
                  {/* @ts-ignore */}
                  {value.movie_description}
                </FullItem.Description>
              </FullItem.Text>
              {/* @ts-ignore */}
              <FullItem.Image src={value.movie_img} alt="movie-poster" />
            </FullItem.Wrapper>
          </FullItem>
        );
    }
  };

  return <>{renderSwitch(status)}</>;
};

export default Movie;
