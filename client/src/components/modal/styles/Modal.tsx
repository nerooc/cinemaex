import styled from 'styled-components';
import colors from '../../../constants/colors';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 40px 30px;
  transition: 0.2s;
  flex-basis: 33%;
  min-width: 300px;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;
