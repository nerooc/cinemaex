import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 180px;
  ${breakpoints.phone} {
    margin-top: 50px;
  }
`;

export const TextWrapper = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  padding: 30px 30px;
  width: 610px;

  ${breakpoints.phone} {
    width: 100%;
  }
`;

export const Image = styled.img<Interfaces.ImgProps>`
  width: 650px;
  padding: 0 30px;

  ${breakpoints.tablet} {
    width: 100%;
  }
`;

export const Header = styled.h1<Interfaces.Props>`
  font-style: normal;
  font-weight: bold;
  font-size: 42px;
  line-height: 60px;

  ${breakpoints.tablet} {
    font-size: 36px;
    line-height: 50px;
  }
`;
export const Description = styled.p<Interfaces.Props>`
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 30px;
  padding: 50px 0;

  ${breakpoints.tablet} {
    font-size: 20px;
    line-height: 25px;
    padding: 30px 0;
  }
`;

export const ButtonContainer = styled.div<Interfaces.Props>`
  display: flex;
  width: 440px;
  justify-content: space-between;

  ${breakpoints.phone} {
    width: 100%;
  }
`;

export const Button = styled(Link)<Interfaces.LinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  background-color: ${(p) =>
    p.forward ? colors.primaryColor : colors.secondaryColor};
  border: ${(p) => (p.forward ? 'none' : '1px solid' + colors.inputBorder)};
  border-radius: 25px;
  text-decoration: none;
  color: ${(p) => (p.forward ? colors.secondaryColor : colors.primaryColor)};
  font-weight: bold;
  font-size: 20px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  ${breakpoints.phone} {
    width: 45%;
  }
`;
