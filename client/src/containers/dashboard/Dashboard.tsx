import React from 'react';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { Panel, Item } from '../../components';

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const getName = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/dashboard', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data.user_name))
        .catch((err) => reject(err));
    });
  };

  const { value } = useAsync<string>(getName, true);

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
