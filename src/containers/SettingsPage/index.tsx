import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { SettingsPageView } from "./view";
import { SettingsPageController } from "./controller";

export interface Props {}

export const SettingsPageContainer = observer(({}: Props) => {
  const controller = useController(SettingsPageController, {});

  useEffect(() => {
    controller.load(1);
  }, []);

  return (
    <SettingsPageView 
      isLoading={controller.isLoading}
      data={controller.data}
    />
  );
})
