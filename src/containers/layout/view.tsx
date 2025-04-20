import React, { ReactNode, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

import { HeaderContainer } from "../header";

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const LayoutView = ({ children }: Props) => {
  return (
    <>
      <Layout style={{ maxWidth: "100vw" }}>
        <HeaderContainer />
        <Layout>
          <Layout style={{ padding: "0 24px 24px" }}>
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
