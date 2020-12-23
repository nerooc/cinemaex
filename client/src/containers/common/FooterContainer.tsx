import React from 'react';
import { Footer } from '../../components';

interface Props {}

const FooterContainer: React.FC<Props> = () => {
  return (
    <Footer>
      <Footer.Content>
        <Footer.Color>@2020</Footer.Color> Tomasz Gajda
      </Footer.Content>
    </Footer>
  );
};

export default FooterContainer;
