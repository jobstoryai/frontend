import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { RecordsListView } from "./view";
import { RecordsListController } from "./controller";
import { AuthController } from "controllers/auth_controller";

export interface Props {}

export const RecordsListContainer = observer(({}: Props) => {
  const authController = useController(AuthController, {});
  const controller = useController(RecordsListController, {});

  useEffect(() => {
    controller.load();
  }, []);

  if (!authController.user) {
    return null;
  }

  return (
    <RecordsListView
      isLoading={controller.isLoading}
      user={authController.user}
      records={controller.data.items}
    />
  );
});
