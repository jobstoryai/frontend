import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { JobExperienceSettingsView } from "./view";
import { JobExperienceSettingsController } from "./controller";

export interface Props {}

export const JobExperienceSettingsContainer = observer(({}: Props) => {
  const controller = useController(JobExperienceSettingsController, {});

  useEffect(() => {
    controller.load(1);
  }, []);

  return (
    <JobExperienceSettingsView 
      isLoading={controller.isLoading}
      data={controller.data}
    />
  );
})
