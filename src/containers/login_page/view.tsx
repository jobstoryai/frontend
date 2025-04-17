import React, { FC } from "react";
import { observer } from "mobx-react-lite";

import { MayBeAsync } from "types";

interface Props {
  onLogin: () => MayBeAsync<void>;
}

export const LoginPageView = observer(({ onLogin }: Props) => (
  <div>
    <button onClick={onLogin}>Login</button>
  </div>
));
