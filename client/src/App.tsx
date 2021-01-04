import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from './utils/axios';

import NavbarContainer from './containers/common/NavbarContainer';
import Home from './containers/home/Home';
import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import Dashboard from './containers/dashboard/Dashboard';
import Movies from './containers/movies/Movies';
import Movie from './containers/movies/Movie';
import Actors from './containers/actors/Actors';
import Actor from './containers/actors/Actor';
import Directors from './containers/directors/Directors';
import Director from './containers/directors/Director';
import Screenings from './containers/screenings/Screenings';
import Reservations from './containers/reservations/Reservations';
import Admin from './containers/admin/Admin';
import FooterContainer from './containers/common/FooterContainer';
import { GlobalStyles } from './globalStyles';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(false);
  const [userRole, setUserRole] = useState<any>('user');

  const setAuth = (boolean: Boolean) => {
    setIsAuthenticated(boolean);
  };

  const setRole = (role: string) => {
    setUserRole(role);
  };

  async function isAuth() {
    try {
      const { data } = await axios.get('/auth/is-verified', {
        headers: { token: localStorage.getItem('token') },
      });

      setAuth(data.auth);
      setRole(data.role);
    } catch (err) {
      console.error(err.message);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    isAuth();
  });

  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <Router>
      <GlobalStyles />
      <NavbarContainer
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        role={userRole}
      />

      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            !isAuthenticated ? (
              <Home {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <Login
                {...props}
                setAuth={setAuth}
                setRole={setRole}
                role={userRole}
              />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/register"
          render={(props) =>
            !isAuthenticated ? (
              <Register
                {...props}
                setAuth={setAuth}
                setRole={setRole}
                role={userRole}
              />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/movies"
          render={(props) =>
            isAuthenticated ? <Movies {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/movies/:id"
          render={(props) =>
            isAuthenticated ? <Movie {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/actors"
          render={(props) =>
            isAuthenticated ? <Actors {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/actors/:id"
          render={(props) =>
            isAuthenticated ? <Actor {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/directors"
          render={(props) =>
            isAuthenticated ? (
              <Directors {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/directors/:id"
          render={(props) =>
            isAuthenticated ? <Director {...props} /> : <Redirect to="/login" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <Dashboard {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/screenings"
          render={(props) =>
            isAuthenticated ? (
              <Screenings {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/admin-panel"
          render={(props) =>
            isAuthenticated && userRole === 'admin' ? (
              <Admin {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/about"
          component={() => {
            window.location.replace('https://tomaszgajda.com/');
            return null;
          }}
        />
        <Route
          exact
          path="/reservations"
          render={(props) =>
            isAuthenticated ? (
              <Reservations {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
      <FooterContainer />
    </Router>
  );
}

export default App;
