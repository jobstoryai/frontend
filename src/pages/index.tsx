import React from "react";
import { LoginPageContainer } from "containers/LoginPage";
import { AuthContainer } from "containers/Auth";

const Page = () => (
  <AuthContainer
    redirectUnauthenticated="/login"
    redirectAuthenticated="/records"
  />
);

export default Page;
