import { Navbar } from '../../components';
import * as ROUTES from '../../constants/routes';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

toast.configure();

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
    toast.success("You've been logged out!", { autoClose: 2000 });
  };

  return (
    // CONDITIONAL RENDERING TO BE ADDED (show specific routes according to the authentication)
    <>
      <Navbar>
        <Navbar.Wrapper>
          <Navbar.Logo to="/dashboard" onClick={() => setActive(false)}>
            cinema
            <Navbar.LogoSpan active={active}>eX</Navbar.LogoSpan>
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
