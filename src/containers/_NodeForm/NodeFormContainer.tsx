import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { Loader } from "components/Loader";
import { useController } from "lib/useController";

import { NodeFormController } from "./NodeFormController";
import { NodeFormView } from "./NodeFormView";

export interface Props {
  id?: number;
}

export const NodeFormContainer = observer(({ id }: Props) => {
  const nodeFormController = useController(NodeFormController, {});

  useEffect(() => {
    if ("number" === typeof id) {
      nodeFormController.load(id);
    }
  }, [id, nodeFormController]);

  const isLoading =
    nodeFormController.isLoading ||
    (Boolean(id) && Boolean(!nodeFormController.data));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NodeFormView
      item={nodeFormController.data}
      onCreate={async (values, form) => {
        const success = await nodeFormController.create(values as any);
        success && form.resetFields()
      }}
      onUpdate={async (id, values) => {
        const success = await nodeFormController.update(id, values);
        success && Router.replace("/admin/nodes/");
      }}
      isModifying={nodeFormController.isModifying}
      onSearch={nodeFormController.onSearch}
      onNodeTagSearch={nodeFormController.onNodeTagSearch}
      onGetSimilarNodes={nodeFormController.onGetSimilarNodes}
      similarNodes={nodeFormController.similarNodes}
    />
  );
});
