import React from 'react';

import { Header, Container, Select, Button, Exit } from './styles/ModalContent';

const ModalContent = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

ModalContent.Header = Header;
ModalContent.Select = Select;
ModalContent.Button = Button;
ModalContent.Exit = Exit;

export default ModalContent;
