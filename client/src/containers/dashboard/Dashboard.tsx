import React from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { useAsync } from '../../hooks/useAsync';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Panel, Item } from '../../components';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Dashboard: React.FC<Props> = ({ setAuth }) => {
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
    <Panel>
      <Panel.Header>Hello, {value}!</Panel.Header>
      <Panel.Container>
        <Panel.Subheader>Upcoming screenings</Panel.Subheader>
        <Panel.Wrapper>
          <Item>
            <Item.Image src="/images/movies/movie.png" alt="movie-preview" />
            <Item.Title>Name of the Movie</Item.Title>
            <Item.Subtitle>Date, hour</Item.Subtitle>
          </Item>

          <Item>
            <Item.Image src="/images/movies/movie.png" alt="movie-preview" />
            <Item.Title>Name of the Movie</Item.Title>
            <Item.Subtitle>Date, hour</Item.Subtitle>
          </Item>
        </Panel.Wrapper>
        <Panel.Button to="/screenings">SEE ALL</Panel.Button>
      </Panel.Container>
    </Panel>
  );
};

export default Dashboard;
