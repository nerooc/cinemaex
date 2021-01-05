import React, { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';

interface MovieTitle {
  id_movie: number;
  movie_title: string;
}

interface MovieTitles extends Array<MovieTitle> {}

const ScreeningsPanel = () => {
  const [screening, setScreening] = useState({
    room: '',
    movie: '',
    date: '',
    hour: '',
    price: '',
  });

  const registerMovies = (): Promise<MovieTitles> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/movies/title', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<MovieTitles>(registerMovies);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreening({
      ...screening,
      [e.target.name]: e.target.value,
    });
  };

  const { room, movie, date, hour, price } = screening;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { room, movie, date, hour, price };

    try {
      const { data } = await axios.post('/post/screening', body, {
        headers: {
          token: localStorage.token,
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
      //toast.error(err.data, toastConfig);
    }
  };

  return (
    <>
      {status === 'pending' && <div>Loading...</div>}

      {status === 'success' && value?.length !== 0 && (
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            width: '50%',
            margin: 'auto',
          }}
        >
          <input name="room" onChange={handleChange} value={room} type="text" />

          <select
            name="movie"
            /* @ts-ignore */
            onChange={handleChange}
            value={movie}
            placeholder="Choose the film"
          >
            {value?.map(({ id_movie, movie_title }) => {
              return (
                <option key={id_movie} value={id_movie}>
                  {movie_title}
                </option>
              );
            })}
          </select>
          <input name="date" onChange={handleChange} value={date} type="text" />

          <input name="hour" onChange={handleChange} value={hour} type="text" />
          <input
            name="price"
            onChange={handleChange}
            value={price}
            type="text"
          />
          <button onClick={handleSubmit}>Add screening</button>
        </div>
      )}

      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}

      {status === 'error' && <div>{error}</div>}
    </>
  );
};

export default ScreeningsPanel;
