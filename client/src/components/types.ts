import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  register?: boolean;
  movie?: boolean;
  actor?: boolean;
  director?: boolean;
}

export interface ImgProps extends Props {
  src: string;
  alt: string;
}

export interface LinkProps extends Props {
  to: string;
  exact?: boolean;
  forward?: boolean;
}

export interface ClickProps extends Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forward?: boolean;
}
