import React, { useState } from 'react';
import axios from '../../utils/axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '../../constants/toastConfig';
import DeleteDirectorPanel from './DeleteDirectorPanel';

toast.configure();

const Header = styled.h1`
  text-align: center;
  padding: 30px;
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 50%;
  margin: auto;

  @media (max-width: 1050px) {
    width: 80%;
  }
`;

const Input = styled.input`
  height: 42px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f6f6f6;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  font-family: Quicksand;
  font-size: 15px;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  height: 150px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f6f6f6;
  border: 1px solid #c5c5c5;
  border-radius: 10px;
  font-family: Quicksand;
  font-size: 15px;
  font-weight: bold;
  resize: vertical;
`;

const Button = styled.button`
  width: 180px;
  background-color: #5a38fd;
  color: white;
  border: none;
  padding: 15px 20px;
  margin: auto;
  margin-top: 30px;
  border-radius: 25px;
  font-family: 'Quicksand';
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const DirectorsPanel = () => {
  const [director, setDirector] = useState({
    name: '',
    surname: '',
    description: '',
    img: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector({
      ...director,
      [e.target.name]: e.target.value,
    });
  };

  const { name, surname, description, img } = director;

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { name, surname, description, img };
    try {
      const { data } = await axios.post('/post/director', body, {
        headers: {
          token: localStorage.token,
        },
      });
      toast.success(data, toastConfig);
    } catch (err) {
      toast.error(err.response.data, toastConfig);
    }
  };

  return (
    <>
      <Container>
        <Header>Add a director</Header>
        <Input
          name="name"
          onChange={handleChange}
          value={name}
          type="text"
          placeholder="Name"
        />
        <Input
          name="surname"
          onChange={handleChange}
          value={surname}
          type="text"
          placeholder="Surname"
        />
        <Textarea
          name="description"
          //@ts-ignore
          onChange={handleChange}
          value={description}
          type="text"
          placeholder="Description"
        />
        <Input
          name="img"
          onChange={handleChange}
          value={img}
          type="text"
          placeholder="Image URL"
        />
        <Button onClick={handleSubmit}>Add director</Button>
      </Container>

      <DeleteDirectorPanel />
    </>
  );
};

export default DirectorsPanel;
