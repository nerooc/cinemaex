import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../utils/axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Register: React.FC<Props> = ({ setAuth }) => {
  const [inputData, setInputData] = useState({
    login: '',
    email: '',
    password: '',
    name: '',
    surname: '',
    newsletter: false,
  });

  const { login, email, password, name, surname, newsletter } = inputData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setInputData({
      ...inputData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { login, password, name, surname, email, newsletter };
    try {
      const response = await axios.post('/auth/register', body);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuth(true);
        toast.success('You have been registered!', { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(err.response.data, { autoClose: 2000 });

      /* Use react-toastify to show error */
    }
  };

  return (
    <>
      <h1>Register</h1>
      {/* login, password, name, surname, email, newsletter */}
      <input
        type="text"
        name="login"
        placeholder="Login"
        value={login}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <input
        type="name"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="surname"
        name="surname"
        placeholder="Surname"
        value={surname}
        onChange={handleChange}
      />
      <br />
      <label>
        <input
          type="checkbox"
          name="newsletter"
          checked={newsletter}
          onChange={handleChange}
        />
        Do you want to get newsletter
      </label>
      <br />

      <button onClick={handleSubmit}>Submit</button>
      <br />

      <Link to="/login">Login</Link>
    </>
  );
};

export default Register;
