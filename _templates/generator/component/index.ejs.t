---
to: src/components/<%=name%>/index.tsx
---
import React, { ReactNode } from 'react';
import cn from 'classnames';
import s from './<%=name%>.module.css';

interface Props {
  children: ReactNode
}

export const <%=name%> = ({ children }: Props) => (
  <div className={cn(s.container)}>
    <div>{children}</div>
  </div>
);
