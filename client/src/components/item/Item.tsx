import React from 'react';

import {
  Container,
  Image,
  Title,
  Subtitle,
  ButtonContainer,
  Button,
} from './styles/Item';

const Item = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

Item.Image = Image;
Item.Title = Title;
Item.Subtitle = Subtitle;
Item.ButtonContainer = ButtonContainer;
Item.Button = Button;

export default Item;
