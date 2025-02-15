import React, { ReactNode } from 'react';
import cn from 'classnames';
import s from './styles.module.css';

interface Props {
  children: ReactNode
}

export const PageWrapper = ({ children }: Props) => (
  <div className={cn(s.container)}>
    <div>{children}</div>
  </div>
);
