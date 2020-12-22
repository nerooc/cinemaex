import React from 'react';

import {
  Container,
  TextWrapper,
  Image,
  Header,
  Description,
  ButtonContainer,
  Button,
} from './styles/Hero';

const Hero = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

Hero.TextWrapper = TextWrapper;
Hero.Image = Image;
Hero.Header = Header;
Hero.Description = Description;
Hero.ButtonContainer = ButtonContainer;
Hero.Button = Button;

export default Hero;
