import styled from 'styled-components';
import colors from '../../../constants/colors';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  font-size: 20px;
`;

export const Header = styled.h1<Interfaces.Props>``;

export const Select = styled.select<Interfaces.Props>`
  border: 1px solid ${colors.primaryColor};
  width: 100px;
  height: 40px;
  border-radius: 25px;
  padding: 0 15px;
  margin-top: 10px;
  font-family: 'Quicksand';
  font-weight: bold;
  font-size: 15px;
`;

export const Exit = styled.button<Interfaces.ClickProps>`
  position: absolute;
  right: 0;
  top: 0;
  font-family: 'Quicksand';
  font-weight: bold;
  font-size: 40px;
  background-color: transparent;
  border: none;
  color: ${colors.primaryColor};
  padding: 30px;
  line-height: 20px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const Button = styled.button<Interfaces.ClickProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 150px;
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
`;
