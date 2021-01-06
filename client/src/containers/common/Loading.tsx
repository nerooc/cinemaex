import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 150px 0;
`;

const Loading = ({ type, color }) => (
  <Container>
    <ReactLoading type={type} color={color} height={250} width={200} />
  </Container>
);

export default Loading;
