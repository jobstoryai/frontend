import React from "react";
import { DownOutlined, LogoutOutlined, ProfileFilled } from "@ant-design/icons";
import {
  BookFilled,
  FundFilled,
  SettingFilled,
  StarFilled,
} from "@ant-design/icons";
import { Avatar, Dropdown, Flex, MenuProps, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { NoSSR } from "components/NoSSR";

import { PROJECT_NAME } from "config";

import s from "./styles.module.css";

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
  <Flex>
    <Flex style={{ flexGrow: 1 }}>
      <Flex justify="flex-start" align="center">
        <Link
          style={{
            flexGrow: 1,
            display: "flex",
            paddingTop: 6,
          }}
          href="/"
        >
          <Title className={s.logo} level={4}>
            {PROJECT_NAME}
          </Title>
        </Link>
        <NoSSR>
          <Link className={s.link} href="/records">
            <StarFilled style={{ marginRight: 6 }} />
            Records
          </Link>
          <Link className={s.link} href="/cvs">
            <BookFilled style={{ marginRight: 6 }} />
            CVs
          </Link>
          <Link className={s.link} href="/tracking">
            <FundFilled style={{ marginRight: 6 }} />
            Tracking
          </Link>
          <Link className={s.link} href="/profile">
            <ProfileFilled style={{ marginRight: 6 }} />
            Profile
          </Link>
        </NoSSR>
      </Flex>
    </Flex>
    <Flex style={{ flexGrow: 1 }} align="center" justify="flex-end">
      <NoSSR>
        <Space direction="horizontal">
          {isLoading ? null : user ? (
            <>
              <Dropdown
                arrow
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
                  <span className={s.username}>{user.email}</span>
                  <Avatar className={s.avatar}>
                    {user.username[0].toUpperCase()}
                  </Avatar>
                </a>
              </Dropdown>
            </>
          ) : null}
        </Space>
      </NoSSR>
    </Flex>
  </Flex>
));
