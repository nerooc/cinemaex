import React from 'react';
import { parseDate } from '../../utils/parseDate';
import { Item } from '../../components';
import { ScreeningPreview } from './Screenings';

interface Props {
  data: ScreeningPreview;
  handleClick: (data: ScreeningPreview) => void;
}

const Screening: React.FC<Props> = ({ data, handleClick }) => {
  return (
    <Item key={data.id_screening}>
      <Item.Image src={data.movie_img} alt="movie-poster" />
      <Item.Title>{data.movie_title}</Item.Title>

      <Item.Subtitle>
        {parseDate(data.screening_date)} {data.screening_hour}
      </Item.Subtitle>

      <Item.ButtonContainer>
        <Item.Button onClick={() => handleClick(data)}>TICKETS</Item.Button>
        <Item.Button>i</Item.Button>
      </Item.ButtonContainer>
    </Item>
  );
};

export default Screening;
