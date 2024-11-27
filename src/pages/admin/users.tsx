import React from "react";

import { AuthContainer } from "containers/Auth";
import { UserListContainer } from "containers/UserList";


const Login = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <UserListContainer />
  </AuthContainer>
);

export default Login;
