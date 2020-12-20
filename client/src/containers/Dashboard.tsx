import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Dashboard: React.FC<Props> = ({ setAuth }) => {
  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("You've been logged out!", { autoClose: 2000 });
  };

  const getName = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/dashboard', {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data.user_name))
        .catch((err) => reject(err));
    });
  };

  const { execute, status, value, error } = useAsync<string>(getName, true);

  return (
    <>
      <h1>Hello, {value}!</h1>
      <button onClick={(e) => logout(e)}>Log out</button>
      <Link to="/movies">Search movies</Link>
    </>
  );
};

export default Dashboard;
