import React, { useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import axios from '../../utils/axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '../../constants/toastConfig';
import Loading from '../common/Loading';
import DeleteScreeningPanel from './DeleteScreeningPanel';

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

      toast.success(data, toastConfig);
    } catch (err) {
      toast.error(err.response.data, toastConfig);
    }
  };

  return (
    <>
      {status === 'pending' && (
        <Loading type="spinningBubbles" color="#5A38FD" />
      )}

      {status === 'success' && value?.length !== 0 && (
        <>
          <Container>
            <Header>Add a screening</Header>
            <Input
              name="room"
              onChange={handleChange}
              value={room}
              type="text"
              placeholder="Room (1-5)"
            />

            <Select
              name="movie"
              /* @ts-ignore */
              onChange={handleChange}
              value={movie}
            >
              {value?.map(({ id_movie, movie_title }) => {
                return (
                  <option key={id_movie} value={id_movie}>
                    {movie_title}
                  </option>
                );
              })}
            </Select>
            <Input
              name="date"
              onChange={handleChange}
              value={date}
              type="text"
              placeholder="Date (DD.MM.YY)"
            />

            <Input
              name="hour"
              onChange={handleChange}
              value={hour}
              type="text"
              placeholder="Hour (HH:MM)"
            />
            <Input
              name="price"
              onChange={handleChange}
              value={price}
              type="number"
              placeholder="Price"
            />
            <Button onClick={handleSubmit}>Add a screening</Button>
          </Container>
          <DeleteScreeningPanel />
        </>
      )}

      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}

      {status === 'error' && <div>{error}</div>}
    </>
  );
};

export default ScreeningsPanel;
