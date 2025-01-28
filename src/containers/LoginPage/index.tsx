import React from "react";
import { observer } from "mobx-react-lite";

import { LoginPageView } from "./view";
import { useAuth } from "lib/auth_provider";

export interface Props {}

export const LoginPageContainer = observer(({}: Props) => {
  const auth = useAuth();

  return <LoginPageView onLogin={() => auth.login()} />;
});
