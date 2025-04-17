import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

import { PublicUser } from "repositories/user_repository";

interface Props {
  user: PublicUser;
}

export const UserHeader = ({ user }: Props) => (
  <Card
    style={{
      marginBottom: 12,
      maxWidth: 800,
      width: "100%",
    }}
  >
    <Card.Meta
      avatar={<Avatar size={64} icon={<UserOutlined />} />}
      title={user.username}
      description={<p>{user.email}</p>}
    />
  </Card>
);
