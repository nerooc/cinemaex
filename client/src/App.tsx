import React, { useState, useEffect } from 'react';
import axios from './utils/axios';
import styled from 'styled-components';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import Movies from './components/Movies';
import Movie from './components/Movie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Container = styled.div`
  background-color: red;
  width: 300px;
  height: 300px;
`;

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
  }, []);

  return isLoading ? (
    <p>Loading..</p>
  ) : (
    <Router>
      <Container>
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
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
