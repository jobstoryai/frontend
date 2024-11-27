import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { NodeTagsView } from "./NodeTagsView";
import { NodeTagsController } from "./NodeTagsController";

export interface Props {}

export const NodeTagsContainer = observer(({}: Props) => {
  const nodeTagsController = useController(NodeTagsController, {});

  useEffect(() => {
    nodeTagsController.load(1);
  }, [nodeTagsController]);

  return (
    <NodeTagsView 
      isLoading={nodeTagsController.isLoading}
      dataPage={nodeTagsController.data}
      onPageChange={nodeTagsController.load}
      onPageSizeChange={(size) => nodeTagsController.setPageSize(size)}
      onSearch={(q) => nodeTagsController.setQuery(q)}
      onSetOrdering={(o) => o
        ? nodeTagsController.setOrdering(o)
        : nodeTagsController.resetOrdering()
      }
      onSetFiltering={(f) => nodeTagsController.setFilters(f)}
    />
  );
})
