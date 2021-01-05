import React, { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';

interface DirectorName {
  id_director: number;
  director_name: string;
  director_surname: string;
}

interface DirectorNames extends Array<DirectorName> {}

const MoviesPanel = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    director: '1',
    release: '',
    duration: '',
    img: '',
  });

  const registerDirectors = (): Promise<DirectorNames> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/directors/name', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<DirectorNames>(registerDirectors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const { title, description, director, release, duration, img } = movie;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { title, description, director, release, duration, img };

    try {
      const { data } = await axios.post('/post/movie', body, {
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
          <input
            name="title"
            onChange={handleChange}
            value={title}
            type="text"
          />
          <input
            name="description"
            onChange={handleChange}
            value={description}
            type="text"
          />
          <select
            name="director"
            /* @ts-ignore */
            onChange={handleChange}
            value={director}
            placeholder="Choose the film"
          >
            {value?.map(({ id_director, director_name, director_surname }) => {
              return (
                <option key={id_director} value={id_director}>
                  {director_name} {director_surname}
                </option>
              );
            })}
          </select>

          <input
            name="release"
            onChange={handleChange}
            value={release}
            type="text"
          />
          <input
            name="duration"
            onChange={handleChange}
            value={duration}
            type="text"
          />
          <input name="img" onChange={handleChange} value={img} type="text" />
          <button onClick={handleSubmit}>Add movie</button>
        </div>
      )}

      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}

      {status === 'error' && <div>{error}</div>}
    </>
  );
};

export default MoviesPanel;
