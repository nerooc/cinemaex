import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../../constants/colors';
import breakpoints from '../../../constants/breakpoints';
import * as Interfaces from '../../types';

export const Container = styled.div<Interfaces.Props>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 600px;
  margin: ${(p) => (p.register ? '100px auto 0 auto' : '200px auto 0 auto')};

  box-shadow: 0px 1px 11px rgba(0, 0, 0, 0.25);
  border-radius: 25px;

  ${breakpoints.tablet} {
    margin: 50px auto 0 auto;
    width: 90%;
  }
`;

export const Wrapper = styled.div<Interfaces.Props>`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 45%;
  padding: 100px 0;

  ${breakpoints.phone} {
    width: 60%;
  }
`;

export const Header = styled.h1<Interfaces.Props>`
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  text-align: center;
  margin-bottom: 10px;
`;

export const Input = styled.input<Interfaces.Props>`
  height: 42px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${colors.secondaryBackground};
  border: 1px solid ${colors.inputBorder};
  border-radius: 10px;
  font-family: Quicksand;
  font-size: 15px;
  font-weight: bold;
`;

export const Checkbox = styled.input.attrs({
  type: 'checkbox',
})<Interfaces.Props>`
  margin: 0 5px 20px 0;
`;

export const ButtonContainer = styled.div<Interfaces.Props>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const Button = styled.button.attrs({
  type: 'submit',
})<Interfaces.ClickProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  width: ${(p) => (p.forward ? '60%' : '35%')};
  background-color: ${(p) =>
    p.forward ? colors.primaryColor : colors.secondaryColor};
  border: ${(p) => (p.forward ? 'none' : '1px solid' + colors.inputBorder)};
  border-radius: 25px;

  ${(p) =>
    p.forward
      ? `
  font-family: Quicksand;
  font-size: 16px;
  color: white;
  font-weight: bold;`
      : null}

  &:hover {
    cursor: pointer;
  }
`;

export const Redirect = styled.p<Interfaces.Props>`
  font-weight: bold;
  text-align: center;
`;

export const RedirectLink = styled(Link)<Interfaces.Props>`
  color: ${colors.primaryColor};
`;
