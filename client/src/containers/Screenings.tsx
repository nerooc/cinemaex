import React from 'react';
import { useAsync } from '../hooks/useAsync';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

interface Props {
  setAuth: (boolean: Boolean) => void;
}

interface ScreeningPreview {
  id_movie: number; // to be able to redirect to movie's description
  id_screening: number;
  movie_title: string;
  movie_duration: string;
  movie_img: string;
  screening_price: number;
  screening_date: string;
  screening_hour: string;
}

interface ScreeningPreviews extends Array<ScreeningPreview> {}

const Screenings: React.FC<Props> = ({ setAuth }) => {
  const getScreenings = (): Promise<ScreeningPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/screenings', {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  const { execute, status, value, error } = useAsync<ScreeningPreviews>(
    getScreenings
  );

  const parseDate = (date: string) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()}.${parsedDate.getMonth()}`;
  };

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return (
          <>
            <h1>Screenings</h1>
            {/*@ts-ignore*/}
            {value.map((screening) => (
              <div key={screening.id_screening}>
                <p>{screening.movie_title}</p>
                <img
                  width="200px"
                  height="300px"
                  src={screening.movie_img}
                  alt="movie-poster"
                />
                <p>
                  {parseDate(screening.screening_date)}{' '}
                  {screening.screening_hour}
                </p>
              </div>
            ))}

            <Link to="/dashboard">Back to dashboard</Link>
          </>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Screenings;
