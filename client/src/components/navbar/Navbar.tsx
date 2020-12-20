import React from 'react';

import {
  Container,
  Wrapper,
  Logo,
  LogoSpan,
  Hamburger,
  Icon,
  Overlay,
  Header,
  Links,
  Link,
} from './styles/Navbar';

const Navbar = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

Navbar.Wrapper = Wrapper;
Navbar.Logo = Logo;
Navbar.LogoSpan = LogoSpan;
Navbar.Hamburger = Hamburger;
Navbar.Icon = Icon;
Navbar.Overlay = Overlay;
Navbar.Header = Header;
Navbar.Links = Links;
Navbar.Link = Link;

export default Navbar;
