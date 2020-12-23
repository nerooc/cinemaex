import React, { useState } from 'react';
import { Navbar } from '../../components';
import { LockBody, ReleaseBody } from '../../globalStyles';
import { toast } from 'react-toastify';
import { toastConfig } from '../../constants/toastConfig';
import * as ROUTES from '../../constants/routes';

interface Props {
  isAuthenticated: boolean;
  setAuth: (boolean: Boolean) => void;
}

const NavbarContainer: React.FC<Props> = ({ isAuthenticated, setAuth }) => {
  const [active, setActive] = useState<boolean>(false);

  const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success("You've been logged out!", toastConfig);
  };

  return (
    <>
      <Navbar>
        {/* There's a problem if hamburger is clicked when scrolled */}
        {active ? <LockBody /> : <ReleaseBody />}
        <Navbar.Wrapper>
          <Navbar.Logo
            to="/dashboard"
            active={active}
            onClick={() => setActive(false)}
          >
            cinema
            <Navbar.LogoSpan active={active}>eX</Navbar.LogoSpan>.
          </Navbar.Logo>
          <Navbar.Hamburger active={active} onClick={() => setActive(!active)}>
            <Navbar.Icon
              src={
                active
                  ? '/images/navbar/ham_opened_icon.svg'
                  : '/images/navbar/ham_icon.svg'
              }
              alt="hamburger-icon"
            />
          </Navbar.Hamburger>
        </Navbar.Wrapper>
      </Navbar>
      <Navbar.Overlay active={active}>
        <Navbar.Links onClick={() => setActive(!active)} active={active}>
          <Navbar.Header>Navigation</Navbar.Header>
          <Navbar.Link exact to={ROUTES.ABOUT}>
            About
          </Navbar.Link>
          {isAuthenticated ? (
            <>
              <Navbar.Link exact to={ROUTES.DASHBOARD}>
                Dashboard
              </Navbar.Link>

              <Navbar.Link to={ROUTES.MOVIES}>Movies</Navbar.Link>
              <Navbar.Link to={ROUTES.SCREENINGS}>Screenings</Navbar.Link>

              <Navbar.Logout onClick={logout}>Log out</Navbar.Logout>
            </>
          ) : (
            <>
              <Navbar.Link to={ROUTES.LOGIN}>Login</Navbar.Link>
              <Navbar.Link to={ROUTES.REGISTER}>Register</Navbar.Link>
            </>
          )}
        </Navbar.Links>
      </Navbar.Overlay>
    </>
  );
};

export default NavbarContainer;
