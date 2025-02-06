import React from "react";

import { AuthContainer } from "containers/auth";
import { CvsPageContainer } from "containers/cvs_page";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <CvsPageContainer />
  </AuthContainer>
);

export default Page;
