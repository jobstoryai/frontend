---
to: src/components/<%= h.changeCase.snakeCase(name) %>/index.tsx
---
import React, { ReactNode } from 'react';
import cn from 'classnames';
import s from './styles.module.css';

interface Props {
  children: ReactNode
}

export const <%=name%> = ({ children }: Props) => (
  <div className={cn(s.container)}>
    <div>{children}</div>
  </div>
);
