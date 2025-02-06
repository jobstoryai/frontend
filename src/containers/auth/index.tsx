import React, { ReactNode } from "react";
import { Row, Spin } from "antd";
import { AuthController } from "controllers/auth_controller";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { isServer } from "lib/is_server";
import { useController } from "lib/use_controller";

import s from "./styles.module.css";

export interface Props {
  children?: ReactNode;
  redirectAuthenticated?: string;
  redirectUnauthenticated?: string;
}

const redirect = (path: string) => {
  isServer() ? null : Router.push(path);
};

export const AuthContainer = observer(
  ({ children, redirectAuthenticated, redirectUnauthenticated }: Props) => {
    const controller = useController(AuthController, {});

    if (controller.isLoading) {
      return (
        <div className={s.overlay}>
          <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
            <Spin />
          </Row>
        </div>
      );
    }

    if (controller.isAuthenticated && redirectAuthenticated) {
      redirect(redirectAuthenticated);
      return null;
    }

    if (!controller.isAuthenticated && redirectUnauthenticated) {
      redirect(redirectUnauthenticated);
      return null;
    }

    return <>{children}</>;
  },
);
