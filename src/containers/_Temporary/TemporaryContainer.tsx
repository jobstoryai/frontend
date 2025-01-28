import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { TemporaryView } from "./TemporaryView";
import { TemporaryController } from "./TemporaryController";

export interface Props {
  id: number;
  // TODO: Add container props here
}

export const TemporaryContainer = observer(({ id }: Props) => {
  const instanceTemporaryController = useController(TemporaryController, {});

  useEffect(() => {
    instanceTemporaryController.load(id);
  }, []);

  return (
    <TemporaryView 
      isLoading={instanceTemporaryController.isLoading}
      data={instanceTemporaryController.data}
    />
  );
})
