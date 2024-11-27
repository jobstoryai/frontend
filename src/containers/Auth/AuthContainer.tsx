import React, { ReactNode } from "react";
import { Row, Spin } from "antd";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { AuthController } from "./AuthController";

import s from "./AuthContainer.module.css";

export interface Props {
  children: ReactNode;
  redirectAuthenticated?: string;
  redirectUnauthenticated?: string;
}

export const AuthContainer = observer(({
  children,
  redirectAuthenticated,
  redirectUnauthenticated
}: Props) => {
  const authController = useController(AuthController, {});

  if (authController.isLoading) {
    return (
      <div className={s.overlay}>
        <Row justify="center" align="middle" style={{minHeight: "100vh"}}>
          <Spin />
        </Row>
      </div>
    );
  }

  if (authController.isAuthenticated && redirectAuthenticated) {
    authController.redirect(redirectAuthenticated)
  }
  
  if (!authController.isAuthenticated && redirectUnauthenticated) {
    authController.redirect(redirectUnauthenticated)
  }


  return <>{children}</>
})
