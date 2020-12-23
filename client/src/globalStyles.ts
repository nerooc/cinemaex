import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    
  }

  *:focus {
    outline: none;
    // Outline is off temporarily (I will bring it [or some other effect] back at some point)
    // box-shadow: 0 0 5pt 2pt black;
  }
  
  html, body {
    height: 100%;
    font-family: Quicksand, Open-Sans, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
}`;

export const LockBody = createGlobalStyle`
  body { 
    overflow: hidden; 
  }
`;

export const ReleaseBody = createGlobalStyle`
  body { 
    overflow: visible; 
  }
`;
