import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ImgProps extends Props {
  src: string;
  alt: string;
}

export interface LinkProps extends Props {
  to: string;
  exact?: boolean;
}

export interface ClickProps extends Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
