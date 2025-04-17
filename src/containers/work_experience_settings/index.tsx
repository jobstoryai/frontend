import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { WorkExperienceSettingsController } from "./controller";
import { WorkExperienceSettingsView } from "./view";

export interface Props {}

export const WorkExperienceSettingsContainer = observer(({}: Props) => {
  const controller = useController(WorkExperienceSettingsController, {});

  useEffect(() => {
    controller.load();
  }, [controller]);

  if (controller.isLoading) {
    return <Loader />;
  }

  return (
    <WorkExperienceSettingsView
      isCreating={controller.isCreating}
      jobs={controller.jobs}
      onCreate={controller.create}
      onUpdate={controller.update}
      onDelete={controller.delete}
    />
  );
});
