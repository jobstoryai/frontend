import React from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { RecordFormView } from "./view";
import { RecordFormController } from "./controller";

export interface Props {}

export const RecordFormContainer = observer(({}: Props) => {
  const controller = useController(RecordFormController, {});

  return (
    <RecordFormView
      onSubmit={controller.create}
      isCreating={controller.isCreating}
    />
  );
});
