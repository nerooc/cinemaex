import React, { useEffect } from 'react';
import axios from '../../utils/axios';
import { useAsync } from '../../hooks/useAsync';
import { Panel, Item } from '../../components';
import Loading from '../common/Loading';

interface Props {}

interface ScreeningPreview {
  id_movie: number;
  id_screening: number;
  movie_title: string;
  movie_duration: string;
  movie_img: string;
  screening_price: number;
  screening_date: string;
  screening_hour: string;
}

interface ScreeningPreviews extends Array<ScreeningPreview> {}

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

  const getScreenings = (): Promise<ScreeningPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/screenings/new', {
          headers: {
            token: localStorage.token,
          },
        })
        .then(({ data }) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  //@ts-ignore
  const { status, value, error } = useAsync<ScreeningPreviews>(getScreenings);

  return (
    <div>
      {status === 'pending' && (
        <Loading type="spinningBubbles" color="#5A38FD" />
      )}

      {status === 'success' && (
        <Panel>
          <Panel.Header>Dashboard</Panel.Header>
          <Panel.Container>
            <Panel.Subheader>Upcoming screenings</Panel.Subheader>
            <Panel.Wrapper>
              {
                //@ts-ignore
                value.map((screening) => {
                  return (
                    <Item>
                      <Item.Image
                        src={screening.movie_img}
                        alt="movie-preview"
                      />
                      <Item.Title>{screening.movie_title}</Item.Title>
                      <Item.Subtitle>
                        {screening.screening_date} {screening.screening_hour}
                      </Item.Subtitle>
                    </Item>
                  );
                })
              }
            </Panel.Wrapper>
            <Panel.Button to="/screenings">SEE ALL</Panel.Button>
          </Panel.Container>
        </Panel>
      )}

      {status === 'success' && value?.length === 0 && (
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
          No reservations assigned to this account!
        </h1>
      )}
      {status === 'error' && <div>{error}</div>}
    </div>
  );
};

export default Dashboard;
