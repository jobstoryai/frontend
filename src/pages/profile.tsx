import React from "react";

import { PageWrapper } from "components/page_wrapper";
import { AuthContainer } from "containers/auth";
import { ProfileSettingsContainer } from "containers/profile_settings";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <PageWrapper>
      <ProfileSettingsContainer />
    </PageWrapper>
  </AuthContainer>
);

export default Page;
