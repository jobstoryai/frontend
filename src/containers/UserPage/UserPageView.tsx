import React from "react";
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";

import { Button, Card, Col, List, Row, Space, Typography } from "antd";
import { Profile } from "repositories/ProfileRepository";
import {
  ClockCircleOutlined,
  EditOutlined,
  HomeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Tag } from "components/Tag";
import { formatDistance } from "date-fns";
import Link from "next/link";
import { observer } from "mobx-react-lite";

interface Props {
  isEditable: boolean;
  data: Profile | null;
}

const getYear = (date: Date) => format(date, "yyyy");

export const UserPageView = observer(({ data, isEditable }: Props) => {
  if (!data) {
    return null;
  }

  return (
    <Row>
      <Col xs={{ span: 24, offset: 0 }} xl={{ span: 16, offset: 4 }}>
        <Card 
          size="small"
          title={`${data.first_name} ${data.last_name} (${data.job_title})`}
          extra={isEditable && (
            <Col span={18} style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link href={`/u/${data.user}/edit`}>
                <Button
                  type="text"
                  style={{ position: 'relative', right: -12 }}
                  icon={<EditOutlined />}
                />
              </Link>
            </Col>
          )}
        >
          <ReactMarkdown>{data.about}</ReactMarkdown>
          {data.knowledge.length ? (
            <Space direction="horizontal" wrap>
              <TagsOutlined />
              {data.knowledge.map((k) => (
                <Tag
                  key={k.slug}
                  item={{
                    color: "#E9B",
                    name: k.title,
                  }}
                />
              ))}
            </Space>
          ) : null}
          <Typography.Title level={4}>Work Experience</Typography.Title>
          <List
            itemLayout="horizontal"
            size="large"
            dataSource={data.work_experience}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <Typography.Title
                      level={4}
                    >{`${item.job_title} at ${item.company}`}</Typography.Title>
                  }
                  description={
                    <Space direction="vertical">
                      <Space direction="horizontal">
                        <Typography.Text strong>
                          <ClockCircleOutlined />
                        </Typography.Text>
                        <Typography.Text>
                          Started in {getYear(item.started)},{" "}
                          {formatDistance(item.started, item.finished)}
                        </Typography.Text>
                      </Space>

                      {(item.primary_skills.length || item.secondary_skills.length) 
                        ? (
                          <Typography.Text strong>
                            <Space direction="horizontal" wrap>
                              <TagsOutlined />
                              {item.primary_skills.map((skill) => (
                                <Tag
                                  key={skill.slug}
                                  item={{
                                    color: "#E9B",
                                    name: skill.title,
                                  }}
                                />
                              ))}
                              {item.secondary_skills.map((skill) => (
                                <Tag
                                  key={skill.slug}
                                  item={{
                                    color: "#9BE",
                                    name: skill.title,
                                  }}
                                />
                              ))}
                            </Space>
                          </Typography.Text>
                        ) : null
                      }

                      <Typography.Text>
                        <ReactMarkdown>{item.description}</ReactMarkdown>
                      </Typography.Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
});
