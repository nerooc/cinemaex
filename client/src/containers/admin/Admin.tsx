import React, { useState } from 'react';
import ActorsPanel from './ActorsPanel';
import DirectorsPanel from './DirectorsPanel';
import MoviesPanel from './MoviesPanel';
import ScreeningsPanel from './ScreeningsPanel';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../constants/colors';
import breakpoints from '../../constants/breakpoints';
import { FaArrowLeft } from 'react-icons/fa';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;
`;

const Button = styled.button`
  width: 180px;
  border: 3px solid #5a38fd;
  background-color: transparent;
  padding: 10px 20px;
  margin: 10px;
  border-radius: 25px;
  font-family: 'Quicksand';
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    color: white;
    background-color: #5a38fd;
    cursor: pointer;
  }
`;

const PanelContainer = styled.div`
  width: 100%;

  @media (max-width: 1050px) {
    width: 100%;
  }
`;

const Return = styled(Link)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.secondaryBackground};
  height: 50px;
  width: 50px;
  border-radius: 50%;
  top: 16%;
  left: 160px;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  background-color: ${colors.primaryColor};

  &:hover {
    cursor: pointer;
  }

  ${breakpoints.desktop} {
    left: 30px;
    height: 40px;
    width: 40px;
    font-size: 20px;
  }
`;

interface Props {}

const Admin: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState('actors');
  return (
    <Container>
      <Return to="/dashboard">
        <FaArrowLeft></FaArrowLeft>
      </Return>
      <ButtonContainer>
        <Button onClick={() => setActiveTab('actors')}>Actors Panel</Button>
        <Button onClick={() => setActiveTab('directors')}>
          Directors Panel
        </Button>
        <Button onClick={() => setActiveTab('movies')}>Movies Panel</Button>
        <Button onClick={() => setActiveTab('screenings')}>
          Screenings Panel
        </Button>
      </ButtonContainer>
      <PanelContainer>
        {activeTab === 'actors' && <ActorsPanel />}
        {activeTab === 'directors' && <DirectorsPanel />}
        {activeTab === 'movies' && <MoviesPanel />}
        {activeTab === 'screenings' && <ScreeningsPanel />}
      </PanelContainer>
    </Container>
  );
};

export default Admin;
