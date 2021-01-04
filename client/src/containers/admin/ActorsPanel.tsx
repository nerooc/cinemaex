import React, { useState } from 'react';
import axios from '../../utils/axios';

const ActorsPanel = () => {
  const [actor, setActor] = useState({
    name: '',
    surname: '',
    description: '',
    img: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActor({
      ...actor,
      [e.target.name]: e.target.value,
    });
  };

  const { name, surname, description, img } = actor;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { name, surname, description, img };
    try {
      const { data } = await axios.post('/post/actor', body, {
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
      <input name="name" onChange={handleChange} value={name} type="text" />
      <input
        name="surname"
        onChange={handleChange}
        value={surname}
        type="text"
      />
      <input
        name="description"
        onChange={handleChange}
        value={description}
        type="text"
      />
      <input name="img" onChange={handleChange} value={img} type="text" />
      <button onClick={handleSubmit}>Add actor</button>
    </div>
  );
};

export default ActorsPanel;
