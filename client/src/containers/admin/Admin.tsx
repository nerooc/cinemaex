import React, { useState } from 'react';
import ActorsPanel from './ActorsPanel';
import DirectorsPanel from './DirectorsPanel';
import MoviesPanel from './MoviesPanel';
import ScreeningsPanel from './ScreeningsPanel';
import styled from 'styled-components';
import { Panel } from '../../components';

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

interface Props {}

const Admin: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState('actors');
  return (
    <Container>
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
