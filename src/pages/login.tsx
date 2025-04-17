import React from "react";

import { AuthContainer } from "containers/auth";
import { LoginPageContainer } from "containers/login_page";

const Login = () => (
  <AuthContainer redirectAuthenticated="/">
    <LoginPageContainer />
  </AuthContainer>
);

export default Login;
