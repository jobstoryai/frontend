import React from "react";

import { AuthContainer } from "containers/auth";
import { OnboardingContainer } from "containers/onboarding";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <OnboardingContainer />
  </AuthContainer>
);

export default Page;
