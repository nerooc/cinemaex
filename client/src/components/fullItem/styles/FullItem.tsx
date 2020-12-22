import styled from 'styled-components';
import colors from '../../../constants/colors';
import { Link } from 'react-router-dom';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../types/IFullItem';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  justify-content: center;
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
  top: 20px;
  left: -25px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  background-color: ${colors.primaryColor};

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export const Wrapper = styled.div<Interfaces.Props>`
  position: relative;
  margin-top: 70px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  padding: 30px;
  border: 5px solid ${colors.primaryColor};
  border-radius: 25px;

  @media (max-width: ${breakpoints.largeDesktop}) {
    width: 90%;
  }
`;

export const Text = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  padding: 50px;

  @media (max-width: ${breakpoints.largeDesktop}) {
    padding: 20px;
  }
`;

export const Image = styled.img<Interfaces.ImgProps>`
  padding: 20px;
  width: 300px;
`;

export const Header = styled.h1<Interfaces.Props>`
  font-weight: bold;
  font-size: 48px;
  line-height: 60px;
`;

export const AdditionalInfo = styled.div<Interfaces.Props>`
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
`;

export const Info = styled.p<Interfaces.Props>`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: ${colors.primaryColor};
`;

export const Description = styled.p<Interfaces.Props>`
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: justify;
  max-width: 700px;
`;
