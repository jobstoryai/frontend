import React, { ReactNode } from "react";

import s from "./styles.module.css";

interface Props {
  children: ReactNode;
}

export const PageWrapper = ({ children }: Props) => (
  <div className={s.container}>
    <div className={s.container_inner}>{children}</div>
  </div>
);
