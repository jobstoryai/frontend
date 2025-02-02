import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { CvsPageView } from "./view";
import { CvsPageController } from "./controller";

export interface Props {}

export const CvsPageContainer = observer(({}: Props) => {
  const controller = useController(CvsPageController, {});

  useEffect(() => {
    controller.load(1);
  }, []);

  return (
    <CvsPageView 
      isLoading={controller.isLoading}
      data={controller.data}
    />
  );
})
