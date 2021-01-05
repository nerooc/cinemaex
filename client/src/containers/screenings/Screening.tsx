import React from 'react';
import { useHistory } from 'react-router-dom';
import { parseDate } from '../../utils/parseDate';
import { Item } from '../../components';
import { ScreeningPreview } from './Screenings';

interface Props {
  data: ScreeningPreview;
  handleClick: (data: ScreeningPreview) => void;
}

const Screening: React.FC<Props> = ({ data, handleClick }) => {
  let history = useHistory();

  return (
    <Item key={data.id_screening}>
      <Item.Image src={data.movie_img} alt="movie-poster" />
      <Item.Title>{data.movie_title}</Item.Title>

      <Item.Subtitle>
        {parseDate(data.screening_date)} {data.screening_hour}
      </Item.Subtitle>

      <Item.ButtonContainer>
        <Item.Button onClick={() => handleClick(data)}>TICKETS</Item.Button>
        <Item.Button onClick={() => history.push('/movies/' + data.id_movie)}>
          INFO
        </Item.Button>
      </Item.ButtonContainer>
    </Item>
  );
};

export default Screening;
