import React from "react";
import { observer } from "mobx-react-lite";

import { SettingsPageView } from "./view";

export interface Props {}

export const SettingsPageContainer = observer(({}: Props) => {
  return <SettingsPageView />;
});
