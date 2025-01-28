import React, { FC, ReactElement, ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";
import { PublicUser } from "repositories/user_repository";
import {
  Avatar,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  BookFilled,
  EllipsisOutlined,
  SettingFilled,
  StarFilled,
  TagFilled,
  UserOutlined,
} from "@ant-design/icons";

interface Props {
  isLoading: boolean;
  user: PublicUser;
}

const TabTitle = ({
  id,
  title,
  onSelect,
  isActive,
  Icon,
}: {
  id: string;
  title: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  Icon: React.ElementType;
}) => {
  return (
    <div onClick={() => onSelect(id)}>
      <Icon
        style={{
          marginRight: 4,
          color: isActive ? "black" : "#777",
        }}
      />
      <Typography.Text
        style={{
          fontWeight: isActive ? "bold" : "normal",
          color: isActive ? "black" : "#777",
        }}
      >
        {title}
      </Typography.Text>
    </div>
  );
};

const items: MenuProps["items"] = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        href="https://www.aliyun.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        2nd menu item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

export const HomePageView = observer(({ user }: Props) => {
  const [activeTab, setActiveTab] = useState("records");
  return (
    <>
      <Card
        actions={[
          <TabTitle
            id="records"
            title="Records"
            Icon={StarFilled}
            isActive={activeTab === "records"}
            onSelect={setActiveTab}
          />,
          <TabTitle
            id="cvs"
            title="CVs"
            Icon={BookFilled}
            isActive={activeTab === "cvs"}
            onSelect={setActiveTab}
          />,
          <TabTitle
            id="profile"
            title="Profile Prompt"
            Icon={SettingFilled}
            isActive={activeTab === "profile"}
            onSelect={setActiveTab}
          />,
        ]}
        style={{ marginBottom: 12 }}
      >
        <Card.Meta
          avatar={<Avatar size={64} icon={<UserOutlined />} />}
          title={user.username}
          description={<p>{user.email}</p>}
        />
      </Card>
      <Card style={{ justifyContent: "center", display: "flex" }}>
        {[
          {
            title: "Updated React Version",
            job: "Facebook, Meta Inc.",
            description:
              "I made a massive achievement updated react version from v18.2.0 to v18.3.0. It was a long jorney took a good couple of months, but I commited and nailed it! Hooray",
            tags: ["frontend", "react"],
          },
          {
            title: "Improved Performance",
            job: "Google",
            description:
              "Implemented various optimizations to improve performance of the web application. Reduced load times and enhanced user experience.",
            tags: ["frontend", "performance"],
          },
          {
            title: "New Feature Development",
            job: "Amazon",
            description:
              "Led the development of a new feature that allowed users to customize their profiles. Collaborated with cross-functional teams to deliver the feature on time.",
            tags: ["frontend", "feature"],
          },
          {
            title: "Bug Fixing",
            job: "Microsoft",
            description:
              "Solved critical bugs that were affecting the functionality of the application. Conducted thorough testing to ensure bug-free code.",
            tags: ["frontend", "bug-fixing"],
          },
          {
            title: "UI Design Overhaul",
            job: "Apple",
            description:
              "Redesigned the user interface to provide a modern and intuitive user experience. Implemented responsive design principles for cross-platform compatibility.",
            tags: ["frontend", "ui-design"],
          },
        ].map((i) => (
          <Card
            style={{
              marginBottom: 12,
              maxWidth: 800,
            }}
          >
            <Card.Meta title={i.title} description={i.description} />
            <div style={{ position: "absolute", top: 14, right: 18 }}>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <EllipsisOutlined style={{ color: "#555" }} />
                  </Space>
                </a>
              </Dropdown>
            </div>

            <Row>
              <Col
                style={{
                  marginTop: 12,
                  justifyContent: "flex-start",
                  display: "flex",
                  flex: 1,
                }}
              >
                <Typography.Text style={{ color: "#888" }}>
                  {new Date().toLocaleString("en-US")}
                </Typography.Text>
              </Col>
              <Col
                style={{
                  marginTop: 12,
                  justifyContent: "flex-end",
                  display: "flex",
                  flex: 1,
                  marginRight: -8,
                }}
              >
                {i.tags.map((tag) => (
                  <Tag color="pink">
                    <TagFilled /> {tag}
                  </Tag>
                ))}
              </Col>
            </Row>
          </Card>
        ))}
      </Card>
    </>
  );
});
