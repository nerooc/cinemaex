import React from 'react';

import { Container, Content, Color } from './styles/Footer';

const Footer = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

Footer.Content = Content;
Footer.Color = Color;

export default Footer;
