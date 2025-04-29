import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { CvSettingsController } from "./controller";
import { CvSettingsView } from "./view";

export interface Props {
  cvId?: number;
}

export const CvSettingsContainer = observer(({ cvId }: Props) => {
  const controller = useController(CvSettingsController, {});

  useEffect(() => {
    if (!!cvId) {
      controller.load(cvId);
    }
  }, [controller, cvId]);

  if (cvId && (controller.isLoading || !controller.data)) {
    return <Loader />;
  }

  return (
    <CvSettingsView
      isCreatingVersion={controller.isCreatingVersion}
      onCreateVersion={controller.createVerion}
      isUpdating={controller.isUpdating}
      onSubmit={(payload) => {
        !!cvId ? controller.update(cvId, payload) : controller.create(payload);
      }}
      onDelete={() => {
        cvId && controller.delete(cvId);
      }}
      isNew={!cvId}
      data={controller.data}
    />
  );
});
