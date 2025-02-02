import React from "react";

import { AuthContainer } from "containers/Auth";
import { SettingsPageContainer } from "containers/SettingsPage";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <SettingsPageContainer />
  </AuthContainer>
);

export default Page;
