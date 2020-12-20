import React, { useState, useEffect } from 'react';
import axios from './utils/axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { GlobalStyles } from './globalStyles';
import Navbar from './containers/Navbar';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import Register from './containers/Register';
import Movies from './containers/Movies';
import Movie from './containers/Movie';
import Screenings from './containers/Screenings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<any>(false);

  const setAuth = (boolean: Boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await axios.get('/auth/is-verified', {
        headers: { token: localStorage.getItem('token') },
      });

      setAuth(response.data);
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
      <Navbar />

      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
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
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/movies"
          render={(props) =>
            isAuthenticated ? (
              <Movies {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/movies/:id"
          render={(props) =>
            isAuthenticated ? (
              <Movie {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            isAuthenticated ? (
              <Dashboard {...props} setAuth={setAuth} />
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
              <Screenings {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

export default App;
