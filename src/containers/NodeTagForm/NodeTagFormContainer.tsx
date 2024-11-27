import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { useController } from "lib/useController";

import { NodeTagFormView } from "./NodeTagFormView";
import { NodeTagFormController } from "./NodeTagFormController";
import { Loader } from "components/Loader";

export interface Props {
  id?: number;
}

export const NodeTagFormContainer = observer(({ id }: Props) => {
  const instanceNodeTagFormController = useController(
    NodeTagFormController,
    {},
  );

  useEffect(() => {
    if ("number" === typeof id) {
      instanceNodeTagFormController.load(id);
    }
  }, [id, instanceNodeTagFormController]);

  const isLoading =
    instanceNodeTagFormController.isLoading ||
    (Boolean(id) && Boolean(!instanceNodeTagFormController.data));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <NodeTagFormView
      item={instanceNodeTagFormController.data}
      onCreate={async (values, form) => {
        await instanceNodeTagFormController.create(values as any);
        Router.replace("/admin/tags/");
      }}
      onUpdate={async (id, values) => {
        await instanceNodeTagFormController.update(id, values);
        Router.replace("/admin/tags/");
      }}
      isModifying={instanceNodeTagFormController.isModifying}
      onDelete={async (id) => {
        await instanceNodeTagFormController.onDelete(id)
        Router.replace("/admin/tags/");
      }}
    />
  );
});
