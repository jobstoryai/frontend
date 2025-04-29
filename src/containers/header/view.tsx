import React, { useMemo, useState } from "react";
import {
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileFilled,
  UserOutlined,
} from "@ant-design/icons";
import { BookFilled, FundFilled, StarFilled } from "@ant-design/icons";
import { Drawer, Flex, Layout, Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import { MenuItemType } from "antd/lib/menu/interface";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import { PROJECT_NAME } from "config";

import s from "./styles.module.css";

const { Sider } = Layout;

interface Props {
  user?: {
    username: string;
    email: string;
  } | null;
  isLoading: boolean;
  onLogout: () => void;
  onLogin: () => void;
  selectedPaths: string[];
}

const SiderMenu = ({
  isLoggedIn,
  isLoggedOut,
  selectedPaths,
  menuItems,
  collapsed,
  setCollapsed,
}: Props & {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  collapsed: boolean;
  menuItems: any;
  setCollapsed: (v: boolean) => void;
}) => {
  return (
    <Sider
      collapsible={isLoggedIn}
      collapsed={isLoggedIn ? collapsed : false}
      onCollapse={(value) => {
        setCollapsed(value);
      }}
    >
      <Link
        style={{
          flexGrow: 1,
          display: "flex",
          paddingTop: 6,
        }}
        href="/"
      >
        {(isLoggedOut || !collapsed) && (
          <Title className={s.logo} level={5}>
            {PROJECT_NAME}
          </Title>
        )}
      </Link>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        selectedKeys={selectedPaths}
        items={menuItems}
      />
    </Sider>
  );
};

const MobileMenu = ({
  selectedPaths,
  menuItems,
}: Props & {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  menuItems: any;
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Header style={{ padding: "0 24px" }}>
        <Flex style={{ flexGrow: 1, height: "100%" }}>
          <Flex justify="flex-start" align="flex-start" style={{ flexGrow: 1 }}>
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                textAlign: "left",
                height: "100%",
              }}
              href="/"
            >
              <Title
                className={s.logo}
                level={4}
                style={{ margin: 0, padding: 0 }}
              >
                {PROJECT_NAME}
              </Title>
            </Link>
          </Flex>
          <Flex
            justify="flex-end"
            align="center"
            style={{ flexGrow: 1, minWidth: 40 }}
          >
            <MenuOutlined
              onClick={() => setVisible(!visible)}
              style={{ color: "#CCC", fontSize: 24 }}
            />
          </Flex>
        </Flex>
      </Header>
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
      >
        <Menu
          theme="light"
          selectedKeys={selectedPaths}
          mode="vertical"
          onClick={() => setVisible(false)}
          items={menuItems}
        />
      </Drawer>
    </>
  );
};

export const HeaderView = observer(
  ({ isLoading, user, selectedPaths, onLogout, onLogin }: Props) => {
    const isLoggedIn = !isLoading && Boolean(user);
    const isLoggedOut = !isLoading && !user;
    const router = useRouter();
    const [collapsed, setCollapsed] = useLocalStorage("sider-collapsed", false);

    const window = useWindowSize();
    const isMobile = window.width <= 575;

    const menuItems = useMemo(() => {
      return [
        isLoggedIn
          ? {
              key: "/records",
              icon: <StarFilled />,
              label: "Records",
              onClick: () => router.push(`/records`),
            }
          : null,
        isLoggedIn
          ? {
              key: "/cvs",
              icon: <BookFilled />,
              label: "Resumes",
              onClick: () => router.push(`/cvs`),
            }
          : null,
        isLoggedIn
          ? {
              key: "/tracking",
              icon: <FundFilled />,
              label: "Tracking",
              onClick: () => router.push(`/tracking`),
            }
          : null,
        isLoggedIn
          ? {
              key: "/jobs",
              icon: <ProfileFilled />,
              label: "Experience",
              onClick: () => router.push(`/jobs`),
            }
          : null,
        isLoggedIn && !isMobile && !collapsed
          ? {
              key: "/profile",
              icon: <UserOutlined />,
              label: user?.email,
              onClick: () => router.push(`/profile`),
              style: { marginTop: 32 },
            }
          : null,
        isLoggedIn
          ? {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: () => onLogout(),
            }
          : null,
        isLoggedOut
          ? {
              key: "login",
              icon: <LoginOutlined />,
              label: "Login",
              onClick: onLogin,
            }
          : null,
      ];
    }, [
      isLoggedOut,
      isLoggedIn,
      onLogin,
      onLogout,
      router,
      user,
      collapsed,
      isMobile,
    ]);

    const props = {
      isLoggedIn,
      isLoggedOut,
      menuItems,
      onLogin,
      onLogout,
      isLoading,
      user,
      selectedPaths,
    };

    return isMobile ? (
      <MobileMenu {...props} />
    ) : (
      <SiderMenu collapsed={collapsed} setCollapsed={setCollapsed} {...props} />
    );
  },
);
