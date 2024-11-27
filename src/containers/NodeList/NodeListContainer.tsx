import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { NodeListController } from "./NodeListController";
import { NodeListView } from "./NodeListView";

export const NodeListContainer = observer(() => {
  const nodeListController = useController(NodeListController, {});

  useEffect(() => {
    nodeListController.load(1);
  }, [nodeListController]);

  return (
    <NodeListView
      isLoading={nodeListController.isLoading}
      dataPage={nodeListController.data}
      onPageChange={nodeListController.load}
      onPageSizeChange={(size) => nodeListController.setPageSize(size)}
      onSearch={(q) => nodeListController.setQuery(q)}
      onSetOrdering={(o) => o
        ? nodeListController.setOrdering(o)
        : nodeListController.resetOrdering()
      }
      onSetFiltering={(f) => nodeListController.setFilters(f)}
      tags={nodeListController.tags}
    />
  );
});
