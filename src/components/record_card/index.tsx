import React, { ReactNode } from "react";
import { EllipsisOutlined, TagFilled } from "@ant-design/icons";
import {
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import { format } from "date-fns";

import { Record } from "repositories/record_repository";

interface Props {
  record: Record;
}

const actions: MenuProps["items"] = [
  {
    label: (
      <a
        href="https://www.antgroup.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Edit
      </a>
    ),
    key: "edit",
  },
  {
    label: (
      <a
        href="https://www.aliyun.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Delete
      </a>
    ),
    key: "delete",
  },
];

export const RecordCard = ({ record }: Props) => (
  <Card
    style={{
      marginBottom: 12,
      maxWidth: 800,
      width: "100%",
    }}
  >
    <Card.Meta title={record.title ?? ""} description={record.content} />
    <div style={{ position: "absolute", top: 14, right: 18 }}>
      <Dropdown menu={{ items: actions }} trigger={["click"]}>
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
          {format(new Date(record.date), "yyyy-MM-dd")}
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
        {/* TODO: TAGS */}
        {[].map((tag) => (
          <Tag color="pink">
            <TagFilled /> {tag}
          </Tag>
        ))}
      </Col>
    </Row>
  </Card>
);
