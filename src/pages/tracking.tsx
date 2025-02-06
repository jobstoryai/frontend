import React from "react";

import { AuthContainer } from "containers/auth";
import { TrackingPageContainer } from "containers/tracking_page";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <TrackingPageContainer />
  </AuthContainer>
);

export default Page;
