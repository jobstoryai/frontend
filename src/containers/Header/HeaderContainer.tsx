import React from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { HeaderController } from "./HeaderController";
import { HeaderView } from "./HeaderView";



export const HeaderContainer = observer(() => {
  const headerController = useController(HeaderController, {});

  return (
    <HeaderView
      isLoading={headerController.isLoading}
      user={headerController.user}
      onLogout={headerController.logout}
    />
  );
})
