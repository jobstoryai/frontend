import React from "react";
import { NodeFormPageView } from "./NodeFormPageView";

export interface Props {
  id: number;
}

export const NodeFormPageContainer = ({ id }: Props) => {
  return (
    <NodeFormPageView id={id} />
  );
}
