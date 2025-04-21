import React, { ReactNode } from "react";
import { Layout } from "antd";

import { HeaderContainer } from "../header";

import s from "./style.module.css";
const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const LayoutView = ({ children }: Props) => {
  return (
    <>
      <Layout className={s.container}>
        <HeaderContainer />
        <Layout className={s.content_outter}>
          <Layout className={s.content}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "transparent",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
