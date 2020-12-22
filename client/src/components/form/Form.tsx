import React from 'react';

import {
  Container,
  Wrapper,
  Header,
  Input,
  Checkbox,
  ButtonContainer,
  Button,
  Redirect,
  RedirectLink,
} from './styles/Form';

const Form = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

Form.Wrapper = Wrapper;
Form.Header = Header;
Form.Input = Input;
Form.Checkbox = Checkbox;
Form.ButtonContainer = ButtonContainer;
Form.Button = Button;
Form.Redirect = Redirect;
Form.RedirectLink = RedirectLink;

export default Form;
