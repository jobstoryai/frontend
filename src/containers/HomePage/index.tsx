import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { HomePageView } from "./view";
import { AuthController } from "controllers/auth_controller";

export interface Props {}

export const HomePageContainer = observer(({}: Props) => {
  const authController = useController(AuthController, {});

  if (!authController.user) {
    return null;
  }

  return (
    <HomePageView
      isLoading={authController.isLoading}
      user={authController.user}
    />
  );
});
