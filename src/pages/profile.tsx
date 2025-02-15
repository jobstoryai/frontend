import React from "react";

import { AuthContainer } from "containers/auth";
import { SettingsPageContainer } from "containers/settings_page";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <SettingsPageContainer />
  </AuthContainer>
);

export default Page;
