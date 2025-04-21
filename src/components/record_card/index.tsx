import React, { ReactNode } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  TagFilled,
} from "@ant-design/icons";
import { Card, Col, Dropdown, Row, Space, Tag, Typography } from "antd";
import { format } from "date-fns";

import { Record } from "repositories/record_repository";

import { MayBeAsync } from "types";

interface Props {
  record: Record;
  onDelete: (id: number) => MayBeAsync<void>;
}

export const RecordCard = ({ record, onDelete }: Props) => (
  <Card
    style={{
      marginBottom: 12,
      maxWidth: 800,
      width: "100%",
    }}
  >
    <Card.Meta
      title={record.title ?? ""}
      description={
        <>
          <Typography.Paragraph>{record.content}</Typography.Paragraph>
        </>
      }
    />
    <div style={{ position: "absolute", top: 14, right: 18 }}>
      <Dropdown
        menu={{
          items: [
            {
              label: "Edit",
              key: "edit",
              icon: <EditOutlined />,
              onClick: () => null,
            },
            { type: "divider" },
            {
              label: "Delete",
              key: "delete",
              style: { color: "red" },
              icon: <DeleteOutlined />,
              onClick: () => onDelete(record.id),
            },
          ],
        }}
        trigger={["click"]}
      >
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
          display: "flex",
          flex: 1,
          justifyContent: "space-between", // Align company to the left and date to the right
        }}
      >
        {record.job?.company ? (
          <Typography.Paragraph style={{ marginRight: 8 }}>
            @<strong>{record.job.company}</strong>
          </Typography.Paragraph>
        ) : null}
        <Typography.Text style={{ color: "#888" }}>
          {format(new Date(record.date), "yyyy-MM-dd")}
        </Typography.Text>
        <Typography.Text style={{ color: "#888" }}>
          SCORE: {record.score}
        </Typography.Text>
      </Col>
    </Row>
    <Row>
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
          <Tag color="pink" key={tag}>
            <TagFilled /> {tag}
          </Tag>
        ))}
      </Col>
    </Row>
  </Card>
);
