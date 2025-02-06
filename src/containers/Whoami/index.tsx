import React from "react";
import { observer } from "mobx-react-lite";


import { WhoamiView } from "./view";

import { useController } from "lib/use_controller";
import { AuthController } from "controllers/auth_controller";

export interface Props {}

export const WhoamiContainer = observer(({}: Props) => {
  const controller = useController(AuthController, {});
  return <WhoamiView isLoading={controller.isLoading} data={controller.user} />;
});
