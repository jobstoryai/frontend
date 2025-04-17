import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { ProfileSettingsController } from "./controller";
import { ProfileSettingsView } from "./view";

export interface Props {}

export const ProfileSettingsContainer = observer(({}: Props) => {
  const controller = useController(ProfileSettingsController, {});

  if (!controller.user) {
    return <Loader />;
  }

  return (
    <ProfileSettingsView
      isUpdating={controller.isUpdating}
      user={controller.user}
      onSubmit={(payload) => {
        controller.update(payload);
      }}
    />
  );
});
