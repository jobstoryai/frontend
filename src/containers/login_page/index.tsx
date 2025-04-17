import React from "react";
import { observer } from "mobx-react-lite";

import { useAuth } from "lib/auth_provider";

import { LoginPageView } from "./view";

export interface Props {}

export const LoginPageContainer = observer(({}: Props) => {
  const auth = useAuth();

  return <LoginPageView onLogin={() => auth.login()} />;
});
