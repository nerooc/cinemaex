import React, { useState } from 'react';
import axios from '../../utils/axios';

const DirectorsPanel = () => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    director: '',
    release: '',
    duration: '',
    img: '',
  });

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
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        width: '50%',
        margin: 'auto',
      }}
    >
      <input name="title" onChange={handleChange} value={title} type="text" />
      <input
        name="description"
        onChange={handleChange}
        value={description}
        type="text"
      />
      <select
        name="direction"
        /* @ts-ignore */
        onChange={handleChange}
        value="Choose a director"
      ></select>
      <input
        name="release"
        onChange={handleChange}
        value={release}
        type="text"
      />
      title, description, director, release, duration, img
      <input
        name="duration"
        onChange={handleChange}
        value={duration}
        type="text"
      />
      <input title="img" onChange={handleChange} value={img} type="text" />
      <button onClick={handleSubmit}>Add movie</button>
    </div>
  );
};

export default DirectorsPanel;
