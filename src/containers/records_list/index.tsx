import React, { useEffect } from "react";
import { AuthController } from "controllers/auth_controller";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { RecordsListController } from "./controller";
import { RecordsListView } from "./view";

export interface Props {}

export const RecordsListContainer = observer(({}: Props) => {
  const authController = useController(AuthController, {});
  const controller = useController(RecordsListController, {});

  useEffect(() => {
    controller.load();
  }, [controller]);

  if (!authController.user) {
    return null;
  }

  return (
    <RecordsListView
      isLoading={controller.isLoading}
      records={controller.data.items}
    />
  );
});
