import React from 'react';

import { Container } from './styles/Modal';

const Modal = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default Modal;
