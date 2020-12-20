import React, { useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Login: React.FC<Props> = ({ setAuth }) => {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { email, password };
    try {
      const response = await axios.post('/auth/login', body);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuth(true);
        toast.success('Login successful!', { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(err.response.data, { autoClose: 2000 });
      /* Use react-toastify to show error */
    }
  };

  return (
    <>
      <h1>Login</h1>
      {/* email, password */}

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
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />

      <Link to="/register">Register</Link>
    </>
  );
};

export default Login;
