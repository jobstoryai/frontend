import React from "react";

import { AuthContainer } from "containers/Auth";
import { CvsPageContainer } from "containers/CvsPage";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <CvsPageContainer />
  </AuthContainer>
);

export default Page;
