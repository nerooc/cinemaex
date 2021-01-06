//@ts-nocheck

import React, { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '../../constants/toastConfig';
import Loading from '../common/Loading';

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

const Select = styled.select`
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

  let { status, value, error } = useAsync<DirectorNames>(registerDirectors);

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
      toast.success(data, toastConfig);
    } catch (err) {
      toast.error(err.data, toastConfig);
    }
  };

  return (
    <>
      {status === 'pending' && (
        <Loading type="spinningBubbles" color="#5A38FD" />
      )}
      {status === 'success' && value?.length !== 0 && (
        <Container>
          <Header>Add a movie</Header>
          <Input
            name="title"
            onChange={handleChange}
            value={title}
            type="text"
            placeholder="Title"
          />
          <Textarea
            name="description"
            //@ts-ignore
            onChange={handleChange}
            value={description}
            type="text"
            placeholder="Description"
          />
          <Select
            name="director"
            /* @ts-ignore */
            onChange={handleChange}
            value={director}
          >
            {value?.map(({ id_director, director_name, director_surname }) => {
              return (
                <option key={id_director} value={id_director}>
                  {director_name} {director_surname}
                </option>
              );
            })}
          </Select>

          <Input
            name="release"
            onChange={handleChange}
            value={release}
            type="text"
            placeholder="Release Date"
          />
          <Input
            name="duration"
            onChange={handleChange}
            value={duration}
            type="text"
            placeholder="Duration"
          />
          <Input
            name="img"
            onChange={handleChange}
            value={img}
            type="text"
            placeholder="Image URL"
          />
          <Button onClick={handleSubmit}>Add a movie</Button>
        </Container>
      )}
      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}
      {status === 'error' && <div>{error}</div>}
    </>
  );
};

export default MoviesPanel;
