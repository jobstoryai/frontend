import React from "react";

import { useController } from "lib/useController";

import { SignInController } from "./SignInController";
import { SignInFormView } from "./SignInFormView";


export const SignInFormContainer = () => {
  const signInController = useController(SignInController, {});
  return (
    <SignInFormView onSubmit={signInController.login} />
  );
}
