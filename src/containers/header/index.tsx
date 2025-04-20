import React from "react";
import { AuthController } from "controllers/auth_controller";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { useAuth } from "lib/auth_provider";
import { useController } from "lib/use_controller";

import { HeaderView } from "./view";

interface Props {}

export const HeaderContainer = observer(({}: Props) => {
  const controller = useController(AuthController, {});
  const auth = useAuth();
  const router = useRouter();
  const segments = router.pathname.split("/").filter(Boolean);
  const selectedPaths = segments.map(
    (_, i) => "/" + segments.slice(0, i + 1).join("/"),
  );

  return (
    <HeaderView
      isLoading={controller.isLoading}
      user={controller.user}
      onLogout={auth.logout}
      onLogin={auth.login}
      selectedPaths={selectedPaths}
    />
  );
});
