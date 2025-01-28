import React from "react";

import { useController } from "lib/useController";

import { WhoamiController } from "./WhoamiController";
import { WhoamiView } from "./WhoamiView";


export const WhoamiContainer = () => {
  const whoamiController = useController(WhoamiController, {});
  return (
    <WhoamiView me={whoamiController.me} />
  );
}
