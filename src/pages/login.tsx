import React from "react";

import { AuthContainer } from "containers/Auth";
import { SignInFormContainer } from "containers/SignInForm";


const Login = () => (
  <AuthContainer redirectAuthenticated="/">
    <SignInFormContainer />
  </AuthContainer>
);

export default Login;
