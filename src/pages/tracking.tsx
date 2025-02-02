import React from "react";

import { AuthContainer } from "containers/Auth";
import { TrackingPageContainer } from "containers/TrackingPage";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <TrackingPageContainer />
  </AuthContainer>
);

export default Page;
