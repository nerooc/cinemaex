import React, { useState } from 'react';
import ActorsPanel from './ActorsPanel';
import DirectorsPanel from './DirectorsPanel';
import MoviesPanel from './MoviesPanel';
import ScreeningsPanel from './ScreeningsPanel';

interface Props {}

const Admin: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState('actors');
  return (
    <>
      <button onClick={() => setActiveTab('actors')}>ActorsPanel</button>
      <button onClick={() => setActiveTab('directors')}>DirectorsPanel</button>
      <button onClick={() => setActiveTab('movies')}>MoviesPanel</button>
      <button onClick={() => setActiveTab('screenings')}>
        ScreeningsPanel
      </button>
      {activeTab === 'actors' && <ActorsPanel />}
      {activeTab === 'directors' && <DirectorsPanel />}
      {activeTab === 'movies' && <MoviesPanel />}
      {activeTab === 'screenings' && <ScreeningsPanel />}
    </>
  );
};

export default Admin;
