import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { TrackingPageController } from "./controller";
import { TrackingPageView } from "./view";

export interface Props {}

export const TrackingPageContainer = observer(({}: Props) => {
  const controller = useController(TrackingPageController, {});

  useEffect(() => {
    controller.load(1);
  }, [controller]);

  return (
    <TrackingPageView 
      isLoading={controller.isLoading}
      data={controller.data}
    />
  );
})
