import React from "react";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { NoSSR } from "components/NoSSR";

import s from "./style.module.css";
import { PROJECT_NAME } from "config";

interface Props {
  user?: {
    username: string;
    email: string;
  } | null;
  isLoading: boolean;
  onLogout: () => void;
}

const dropdownItems: MenuProps["items"] = [
  { icon: LogoutOutlined, label: "Logout", key: "logout" },
].map(({ icon, label, key }) => ({
  key,
  icon: React.createElement(icon),
  label,
}));

export const HeaderView = observer(({ user, isLoading, onLogout }: Props) => (
  <>
    <Link href="/">
      <Title className={s.logo} level={4}>
        {PROJECT_NAME}
      </Title>
    </Link>
    <NoSSR>
      <Space direction="horizontal" style={{ float: "right" }}>
        {/* <Link className={s.admin} href="/search">
          <Button type="text" className={s.admin_button}>
            Search
          </Button>
        </Link>
        <Link className={s.admin} href="/admin">
          <Button type="text" className={s.admin_button}>
            Admin
          </Button>
        </Link> */}
        {isLoading ? null : user ? (
          <>
            <Dropdown
              arrow
              className={s.username}
              menu={{
                onClick: ({ key }) => {
                  if (key === "logout") {
                    onLogout();
                  }
                },
                items: dropdownItems,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {user.username}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <Avatar className={s.avatar}>
              {user.username[0].toUpperCase()}
            </Avatar>
          </>
        ) : null}
      </Space>
    </NoSSR>
  </>
));
