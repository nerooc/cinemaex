import React from 'react';

import { Container, Return, Header, Wrapper } from './styles/ItemList';

const ItemList = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

ItemList.Return = Return;
ItemList.Header = Header;
ItemList.Wrapper = Wrapper;

export default ItemList;
