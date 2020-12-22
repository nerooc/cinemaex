import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from '../../components';
import { FaChevronLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

toast.configure();

interface Props {
  setAuth: (boolean: Boolean) => void;
}

const Login: React.FC<Props> = ({ setAuth }) => {
  let history = useHistory();

  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = { email, password };
    console.log(body);
    try {
      const response = await axios.post('/auth/login', body);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setAuth(true);
        toast.success('Login successful!', { autoClose: 2000 });
      }
    } catch (err) {
      toast.error(err.response.data, { autoClose: 2000 });
      /* Use react-toastify to show error */
    }
  };

  const handleReturn = () => {
    history.push('/');
  };

  /* Allows the user to use enter key to submit data */
  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        handleSubmit(event);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [inputData]);

  return (
    <Form>
      <Form.Wrapper>
        <Form.Header>Login</Form.Header>

        <Form.Input
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={handleChange}
        />
        <Form.Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
        />
        <Form.ButtonContainer>
          <Form.Button onClick={handleReturn}>
            <FaChevronLeft />
          </Form.Button>
          <Form.Button forward onClick={handleSubmit}>
            LOG IN
          </Form.Button>
        </Form.ButtonContainer>
        <Form.Redirect>
          Not a member?&nbsp;
          <Form.RedirectLink to="/register">Sign up now!</Form.RedirectLink>
        </Form.Redirect>
      </Form.Wrapper>
    </Form>
  );
};

export default Login;
