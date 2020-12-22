import React from 'react';

import {
  Main,
  Header,
  Container,
  Subheader,
  Wrapper,
  Button,
} from './styles/Panel';

const Panel = ({ children, ...props }) => {
  return <Main {...props}>{children}</Main>;
};

Panel.Header = Header;
Panel.Container = Container;
Panel.Subheader = Subheader;
Panel.Wrapper = Wrapper;
Panel.Button = Button;

export default Panel;
