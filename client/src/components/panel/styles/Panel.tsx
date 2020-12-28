import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../../types';

export const Main = styled.div<Interfaces.Props>`
  margin-top: 70px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.h1<Interfaces.Props>`
  font-size: 48px;
  margin-bottom: 20px;
`;

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  align-items: center;
  border: 5px solid ${colors.primaryColor};
  border-radius: 25px;
  padding: 20px 40px;

  ${breakpoints.tablet} {
    width: 90%;
  }
`;

export const Subheader = styled.h2<Interfaces.Props>`
  font-size: 32px;
  text-align: center;
`;

export const Wrapper = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 20px;
`;

export const Button = styled(Link)<Interfaces.LinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  background-color: ${colors.primaryColor};
  border-radius: 25px;
  text-decoration: none;
  color: ${colors.secondaryColor};
  font-weight: bold;
  font-size: 20px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
