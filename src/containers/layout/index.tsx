import React from "react";

import { LayoutView } from "./view";

export interface Props {
  children: React.ReactNode;
}

export const LayoutContainer = ({ children }: Props) => {
  return <LayoutView>{children}</LayoutView>;
};
