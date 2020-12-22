import { ReactNode } from 'react';

export interface Props {
  children?: ReactNode;
  active?: boolean;
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
