import React from 'react';
import axios from '../../utils/axios';
import { parseDate } from '../../utils/parseDate';
import { useAsync } from '../../hooks/useAsync';
import { ItemList, Item } from '../../components';
import { FaArrowLeft } from 'react-icons/fa';

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

const Screenings: React.FC<Props> = () => {
  const getScreenings = (): Promise<ScreeningPreviews> => {
    return new Promise((resolve, reject) => {
      axios
        .get('/screenings', {
          headers: {
            token: localStorage.token,
          },
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  };

  const { status, value, error } = useAsync<ScreeningPreviews>(getScreenings);

  const renderSwitch = (param: string) => {
    switch (param) {
      case 'idle' || 'pending':
        return <p>Loading post...</p>;
      case 'error':
        return <h1> {error} </h1>;
      case 'success':
        return value !== null ? (
          <ItemList>
            <ItemList.Return to="/dashboard">
              <FaArrowLeft />
            </ItemList.Return>
            <ItemList.Header>Screenings</ItemList.Header>
            <ItemList.Wrapper>
              {value.map((screening) => (
                <Item key={screening.id_screening}>
                  <Item.Image src={screening.movie_img} alt="movie-poster" />
                  <Item.Title>{screening.movie_title}</Item.Title>

                  <Item.Subtitle>
                    {parseDate(screening.screening_date)}{' '}
                    {screening.screening_hour}
                  </Item.Subtitle>
                </Item>
              ))}
            </ItemList.Wrapper>
          </ItemList>
        ) : (
          <p>Something went wrong!</p>
        );
    }
  };
  return <>{renderSwitch(status)}</>;
};
export default Screenings;
