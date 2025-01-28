import React from "react";

import { AuthContainer } from "containers/Auth";
import { HomePageContainer } from "containers/HomePage";

const Login = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <HomePageContainer />
  </AuthContainer>
);

export default Login;
