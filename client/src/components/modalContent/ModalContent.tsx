import React from 'react';

import { Container, Select, Button, Exit } from './styles/ModalContent';

const ModalContent = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

ModalContent.Select = Select;
ModalContent.Button = Button;
ModalContent.Exit = Exit;

export default ModalContent;
