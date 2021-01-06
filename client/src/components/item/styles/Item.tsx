import styled from 'styled-components';
import colors from '../../../constants/colors';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 40px 30px;
  transition: 0.2s;
  flex-basis: 33%;
  min-width: 300px;

  ${(p) =>
    p.movie || p.actor || p.director
      ? `
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  `
      : null}
`;

export const Image = styled.img<Interfaces.ImgProps>`
  width: 200px;
  height: 280px;
`;

export const Title = styled.h1<Interfaces.Props>`
  font-size: 24px;
  margin: 15px 0;
  text-align: center;
`;

export const Subtitle = styled.h2<Interfaces.Props>`
  font-size: 20px;
  color: ${colors.primaryColor};
`;

export const ButtonContainer = styled.div<Interfaces.Props>`
  display: flex;
  width: 200px;
`;

export const Button = styled.button<Interfaces.ClickProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  margin: 5px;
  background-color: #5a38fd;
  border: none;
  border-radius: 25px;
  font-family: Quicksand;
  font-size: 16px;
  color: white;
  font-weight: bold;
  margin-top: 20px;
  transition: 0.2s;

  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
  flex-grow: 1;
`;
