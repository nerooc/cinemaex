import styled from 'styled-components';
import { Link as LinkTo, NavLink } from 'react-router-dom';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../../types';

export const Container = styled.nav<Interfaces.Props>`
  height: 130px;
  width: 100%;
  background-color: ${colors.secondaryColor}; //for testing
`;

export const Wrapper = styled.div<Interfaces.Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 160px;

  ${breakpoints.desktop} {
    margin: 0 30px;
  }
`;

export const Logo = styled(LinkTo)<Interfaces.LinkProps>`
  position: relative;
  z-index: 5;
  font-size: 36px;
  font-weight: bold;
  color: ${(p) => (p.active ? colors.secondaryColor : colors.fontColor)};
  text-decoration: none;
  transition: 0.5s;

  ${breakpoints.tablet} {
    font-size: 24px;
  }
`;

export const LogoSpan = styled.span<Interfaces.Props>`
  color: ${(p) => (p.active ? colors.secondaryColor : colors.primaryColor)};
  transition: 0.5s;
`;

export const Hamburger = styled.button<Interfaces.ClickProps>`
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: ${(p) =>
    p.active ? colors.secondaryColor : colors.primaryColor};
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Overlay = styled.ul<Interfaces.Props>`
  position: absolute;
  z-index: 3;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: ${colors.primaryColor};
  opacity: ${(p) => (p.active ? '1' : '0')};
  clip-path: ${(p) =>
    p.active ? 'circle(3000px at 90% -10%)' : 'circle(100px at 90% -10%)'};
  pointer-events: ${(p) => (p.active ? 'all' : 'none')};
  transition: all 0.5s ease-out;
`;

export const Header = styled.h1<Interfaces.Props>`
  position: relative;
  color: white;
  padding: 20px 0;
  font-weight: 600;
  font-size: 40px;
  line-height: 140%;

  &:after {
    content: '';
    position: absolute;
    bottom: 10px;
    left: -20px;

    width: 240px;
    height: 3px;
    background-color: white;

    ${breakpoints.phone} {
      width: 200px;
    }
  }

  ${breakpoints.phone} {
    font-size: 30px;
  }
`;

export const Links = styled.ul<Interfaces.Props>`
  display: flex;
  flex-direction: column;
`;

const activeClassName = 'nav-link--active';

export const Link = styled(NavLink).attrs({
  activeClassName,
})<Interfaces.LinkProps>`
  position: relative;
  font-size: 30px;
  color: ${colors.secondaryColor};
  line-height: 140%;
  text-decoration: none;
  padding: 10px 0;
  transition: 0.1s;

  &:hover {
    transform: translateX(10px);
  }

  &.${activeClassName} {
    font-weight: 600;
  }

  &.${activeClassName}:before {
    content: '';
    position: absolute;
    top: 50%;
    left: -25px;
    border-style: solid;
    border-width: 4px 4px 0 0;
    display: inline-block;
    height: 0.45em;
    width: 0.45em;
    transform: translateY(-50%) rotate(45deg);
  }

  ${breakpoints.phone} {
    font-size: 27px;
  }
`;

export const Logout = styled.span<Interfaces.ClickProps>`
  font-size: 30px;
  color: ${colors.secondaryColor};
  line-height: 140%;
  text-decoration: none;
  padding: 10px 0;
  border: none;
  background-color: transparent;
  transition: 0.1s;

  &:hover {
    transform: translateX(10px);
    cursor: pointer;
  }
`;

export const Icon = styled.img<Interfaces.ImgProps>``;
