import React from 'react';
import { Hero } from '../../components';

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <Hero>
      <Hero.TextWrapper>
        <Hero.Header>
          We develop experiences <br /> Join us today.
        </Hero.Header>
        <Hero.Description>
          cinemaeX is the first ever 12D movie experience provider in the world
        </Hero.Description>
        <Hero.ButtonContainer>
          <Hero.Button forward to="/login">
            LOG IN
          </Hero.Button>
          <Hero.Button to="/register">SIGN UP</Hero.Button>
        </Hero.ButtonContainer>
      </Hero.TextWrapper>

      <Hero.Image src="images/hero/hero-image.png" alt="hero-picture" />
    </Hero>
  );
};

export default Home;
