import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  position: relative;
  margin-top: 50px;
`;

export const Return = styled(Link)<Interfaces.LinkProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondaryBackground};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  top: 10px;
  left: 160px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  background-color: ${colors.primaryColor};

  &:hover {
    cursor: pointer;
  }

  ${breakpoints.desktop} {
    left: 30px;
    height: 40px;
    width: 40px;
    font-size: 20px;
  }
`;

export const Header = styled.h1<Interfaces.Props>`
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  line-height: 140%;
  margin-bottom: 30px;

  ${breakpoints.phone} {
    font-size: 40px;
  }
`;

export const Wrapper = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: row wrap;
  width: 80%;
  justify-content: center;
  margin: auto;

  &::after {
    content: '';
    flex: auto;
  }

  ${breakpoints.largeDesktop} {
    &::after {
      content: '';
      flex: none;
    }
  }
`;
