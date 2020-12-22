import styled from 'styled-components';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import { Link } from 'react-router-dom';
import * as Interfaces from '../types/IItem';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 40px 30px;
  transition: 0.2s;
  flex-basis: 33%;
  min-width: 300px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Image = styled.img<Interfaces.ImgProps>`
  width: 200px;
`;

export const Title = styled.h1<Interfaces.Props>`
  font-size: 20px;
  margin: 8px 0;
`;

export const Subtitle = styled.h2<Interfaces.Props>`
  font-size: 20px;
  color: ${colors.primaryColor};
`;
