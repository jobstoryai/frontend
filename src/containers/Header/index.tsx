import React from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { HeaderView } from "./view";
import { AuthController } from "controllers/auth_controller";
import { useAuth } from "lib/auth_provider";

export const HeaderContainer = observer(() => {
  const controller = useController(AuthController, {});
  const auth = useAuth();

  return (
    <HeaderView
      isLoading={controller.isLoading}
      user={controller.user}
      onLogout={auth.logout}
    />
  );
});
