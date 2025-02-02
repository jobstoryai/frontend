import React, { ReactNode } from "react";
import { Layout } from "antd";

import { HeaderContainer } from "../Header";

const { Header, Content } = Layout;

interface Props {
  children: ReactNode;
}

export const LayoutView = ({ children }: Props) => (
  <>
    <Layout>
      <Header>
        <HeaderContainer />
      </Header>
      <Layout>
        <Layout style={{ padding: "24px" }}>
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
