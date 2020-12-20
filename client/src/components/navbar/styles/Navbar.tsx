import styled from 'styled-components';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import { NavLink } from 'react-router-dom';
import * as Interfaces from '../types/INavbar';

export const Container = styled.nav<Interfaces.Props>`
  height: 130px;
  width: 100%;
  background-color: ${colors.secondaryColor}; //for testing
`;

export const Wrapper = styled.div<Interfaces.Props>`
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 160px;

  @media (max-width: ${breakpoints.desktop}) {
    margin: 0 30px;
  }
`;

export const Logo = styled.h1<Interfaces.Props>`
  position: relative;
  z-index: 1;
  font-size: 36px;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 24px;
  }
`;

export const LogoSpan = styled.span<Interfaces.Props>`
  color: ${(p) => (p.active ? colors.secondaryColor : colors.primaryColor)};
  transition: 0.5s;
`;

export const Hamburger = styled.button<Interfaces.ClickProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(p) =>
    p.active ? colors.secondaryColor : colors.primaryColor};
  border: none;
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Overlay = styled.ul<Interfaces.Props>`
  transition: all 0.5s ease-out;
  display: flex;
  background: ${colors.primaryColor};
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  opacity: ${(p) => (p.active ? '1' : '0')};
  pointer-events: ${(p) => (p.active ? 'all' : 'none')};
  clip-path: ${(p) =>
    p.active ? 'circle(3000px at 90% -10%)' : 'circle(100px at 90% -10%)'};
  justify-content: center;
  align-items: center;
`;

export const Header = styled.h1<Interfaces.Props>`
  font-family: Quicksand;
  color: white;
  padding: 30px 0;
  font-weight: 600;
  font-size: 40px;
  line-height: 140%;
`;

export const Links = styled.ul<Interfaces.Props>`
  display: flex;
  flex-direction: column;
`;

const activeClassName = 'nav-link--active';

export const Link = styled(NavLink).attrs({
  activeClassName,
})<Interfaces.LinkProps>`
  text-decoration: none;
  font-size: 30px;
  color: ${colors.secondaryColor};
  line-height: 140%;
  position: relative;
  padding: 10px 0;
  transition: 0.1s;

  &.${activeClassName} {
    font-weight: 600;
  }

  &.${activeClassName}:before {
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    display: inline-block;
    height: 0.45em;
    position: absolute;
    vertical-align: top;
    width: 0.45em;
    left: -25px;
    top: 50%;
    transform: translateY(-50%) rotate(45deg);
  }
`;

export const Icon = styled.img<Interfaces.ImgProps>``;
