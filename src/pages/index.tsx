import React from "react";

import { AuthContainer } from "containers/auth";

const Page = () => (
  <AuthContainer
    redirectUnauthenticated="/login"
    redirectAuthenticated="/records"
  />
);

export default Page;
