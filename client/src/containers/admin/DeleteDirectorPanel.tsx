import React, { useState } from 'react';
import axios from '../../utils/axios';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '../../constants/toastConfig';
import { useAsync } from '../../hooks/useAsync';
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

const DirectorsPanel = () => {
  const [director, setDirector] = useState('1');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirector(e.target.value);
  };

  const deleteDirector = async (id) => {
    try {
      const { data } = await axios.delete(`/directors/${id}`, {
        headers: {
          token: localStorage.token,
        },
      });

      if (data) {
        toast.success(data, toastConfig);
        execute();
      }
    } catch (err) {
      toast.error(err.data, toastConfig);
    }
  };

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

  const { status, value, error, execute } = useAsync<DirectorNames>(
    registerDirectors
  );

  return (
    <>
      {status === 'pending' && (
        <Loading type="spinningBubbles" color="#5A38FD" />
      )}
      {status === 'success' && value?.length !== 0 && (
        <Container>
          <Header>Delete a director</Header>
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

          <Button onClick={() => deleteDirector(director)}>
            Delete a director
          </Button>
        </Container>
      )}
      {status === 'success' && value?.length === 0 && (
        <div>No reservations assigned to this account!</div>
      )}
      {status === 'error' && <div>{error}</div>}
    </>
  );
};

export default DirectorsPanel;
