import React, { useEffect } from "react";
import { NodeTreeView } from "./NodeTreeView";
import { useController } from "lib/useController";
import { NodeTreeController } from "./NodeTreeController";
import { observer } from "mobx-react-lite";

export interface Props {
  id: number;
}

export const NodeTreeContainer = observer(({ id }: Props) => {
  const nodeTreeController = useController(NodeTreeController, {});

  useEffect(() => {
    if ("number" === typeof id) {
      nodeTreeController.load(id)
    }
  }, [id])

  return (
    <NodeTreeView tree={nodeTreeController.data as any} />
  );
})
