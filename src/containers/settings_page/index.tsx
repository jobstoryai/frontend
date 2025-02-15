import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { SettingsPageController } from "./controller";
import { SettingsPageView } from "./view";

export interface Props {}

export const SettingsPageContainer = observer(({}: Props) => {
  const controller = useController(SettingsPageController, {});

  useEffect(() => {
    controller.load();
  }, [controller]);

  if (controller.isLoading || !controller.data) {
    return <Loader />;
  }

  return (
    <SettingsPageView
      isUpdating={controller.isUpdating}
      data={controller.data}
      jobs={controller.jobs}
      onSubmit={controller.update}
    />
  );
});
