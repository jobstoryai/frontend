import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { RecordFormController } from "./controller";
import { RecordFormView } from "./view";

export interface Props {}

export const RecordFormContainer = observer(({}: Props) => {
  const controller = useController(RecordFormController, {});

  useEffect(() => {
    controller.load();
  }, [controller]);

  return (
    <RecordFormView
      jobs={controller.jobs}
      isLoadingJobs={controller.isLoadingJobs}
      onSubmit={controller.create}
      isCreating={controller.isCreating}
    />
  );
});
