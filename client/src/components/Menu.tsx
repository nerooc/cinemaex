import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Menu: React.FC<Props> = ({ setAuth }) => {
  const [name, setName] = useState('');

  async function getName() {
    try {
      const response = await axios.get('/menu', {
        headers: {
          token: localStorage.token,
        },
      });

      setName(response.data.user_name);
    } catch (err) {
      console.error(err.response.data);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("You've been logged out!", { autoClose: 2000 });
  };

  return (
    <>
      <h1>Hello, {name}!</h1>
      <button onClick={(e) => logout(e)}>Log out</button>
    </>
  );
};

export default Menu;
