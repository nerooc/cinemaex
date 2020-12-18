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

import Menu from './components/Menu';
import Login from './components/Login';
import Register from './components/Register';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Container = styled.div`
  background-color: red;
  width: 300px;
  height: 300px;
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

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
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <>
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
                  <Redirect to="/menu" />
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
                  <Redirect to="/menu" />
                )
              }
            />
            <Route
              exact
              path="/menu"
              render={(props) =>
                isAuthenticated ? (
                  <Menu {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
