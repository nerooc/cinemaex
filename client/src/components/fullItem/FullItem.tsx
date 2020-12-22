import React from 'react';

import {
  Container,
  Return,
  Wrapper,
  Text,
  Image,
  Header,
  AdditionalInfo,
  Info,
  Description,
} from './styles/FullItem';

const FullItem = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

FullItem.Return = Return;
FullItem.Wrapper = Wrapper;
FullItem.Text = Text;
FullItem.Image = Image;
FullItem.Header = Header;
FullItem.AdditionalInfo = AdditionalInfo;
FullItem.Info = Info;
FullItem.Description = Description;

export default FullItem;
