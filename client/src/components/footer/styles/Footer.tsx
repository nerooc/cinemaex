import styled from 'styled-components';
import colors from '../../../constants/colors';
import * as Interfaces from '../../types';

export const Container = styled.footer<Interfaces.Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  margin-top: 50px;
`;

export const Content = styled.p<Interfaces.Props>`
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
`;

export const Color = styled.span<Interfaces.Props>`
  color: ${colors.primaryColor};
`;
