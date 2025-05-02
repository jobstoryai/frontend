import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useStore } from "stores/use_store";
import { useController } from "lib/use_controller";

import { OnboardingProgressController } from "./controller";
import { OnboardingProgressView } from "./view";

export interface Props {}

export const OnboardingProgressContainer = observer(({}: Props) => {
  const controller = useController(OnboardingProgressController, {});
  const appStore = useStore();

  useEffect(() => {
    if (appStore.authStore.user) {
      controller.load();
      return;
    }
    controller.disable();
  }, [appStore.authStore.user, controller]);

  if (!controller.isReady || controller.isCompleted) {
    return null;
  }

  return (
    <OnboardingProgressView
      jobs={controller.state.jobs}
      records={controller.state.records}
      cvsVersions={controller.state.cv_versions}
    />
  );
});
