import { Navbar } from '../components';
import * as ROUTES from '../constants/routes';
import React, { useState } from 'react';

const NavbarContainer = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <>
      <Navbar>
        <Navbar.Wrapper>
          <Navbar.Logo>
            cinema
            <Navbar.LogoSpan active={active}>eX</Navbar.LogoSpan>
          </Navbar.Logo>
          <Navbar.Hamburger active={active} onClick={() => setActive(!active)}>
            <Navbar.Icon
              src={
                active
                  ? 'images/navbar/ham_opened_icon.svg'
                  : 'images/navbar/ham_icon.svg'
              }
              alt="hamburger-icon"
            />
          </Navbar.Hamburger>
        </Navbar.Wrapper>
      </Navbar>
      <Navbar.Overlay active={active}>
        <Navbar.Links onClick={() => setActive(!active)} active={active}>
          <Navbar.Header>Navigation</Navbar.Header>
          <Navbar.Link exact to={ROUTES.HOME}>
            Home
          </Navbar.Link>
          <Navbar.Link to={ROUTES.LOGIN}>Login</Navbar.Link>
          <Navbar.Link to={ROUTES.REGISTER}>Register</Navbar.Link>
          <Navbar.Link to={ROUTES.MOVIES}>Movies</Navbar.Link>
          <Navbar.Link to={ROUTES.SCREENINGS}>Screenings</Navbar.Link>
        </Navbar.Links>
      </Navbar.Overlay>
    </>
  );
};

export default NavbarContainer;
