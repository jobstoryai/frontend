import React from "react";
import { AuthController } from "controllers/auth_controller";
import { observer } from "mobx-react-lite";

import { useAuth } from "lib/auth_provider";
import { useController } from "lib/use_controller";

import { HeaderView } from "./view";

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
