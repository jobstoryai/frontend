import React, { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, List, Row, Space, Typography } from "antd";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

import { Job, JobPayload } from "repositories/job_repository";

import { MayBeAsync } from "types";

import { WorkExperienceForm } from "./components/form";

interface Props {
  jobs: Job[];
  isCreating: boolean;
  onCreate: (payload: JobPayload) => MayBeAsync<void>;
  onDelete: (id: number) => MayBeAsync<void>;
  onUpdate: (id: number, payload: JobPayload) => MayBeAsync<void>;
}

const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export const WorkExperienceSettingsView = observer(
  ({ jobs, onCreate, onDelete, isCreating, onUpdate }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState<Job | null>(null);
    const onEdit = (job: Job) => {
      setModalData(job);
      setIsOpen(true);
    };

    return (
      <>
        <List
          bordered
          header={
            <Row justify="end">
              <Button
                type="primary"
                onClick={() => {
                  setModalData(null);
                  setIsOpen(true);
                }}
              >
                Create
              </Button>
            </Row>
          }
        >
          {jobs.map((job) => (
            <List.Item
              key={job.id}
              extra={
                <Space key={"dropdown"} align="start" direction="vertical">
                  <Dropdown
                    menu={{
                      items: [
                        {
                          label: "Edit",
                          key: "edit",
                          icon: <EditOutlined />,
                          onClick: () => onEdit(job),
                        },
                        { type: "divider" },
                        {
                          label: "Delete",
                          key: "delete",
                          style: { color: "red" },
                          icon: <DeleteOutlined />,
                          onClick: () => onDelete(job.id),
                        },
                      ],
                    }}
                    trigger={["click"]}
                  >
                    <Space style={{ cursor: "pointer" }}>
                      <EllipsisOutlined style={{ color: "#555" }} />
                    </Space>
                  </Dropdown>
                </Space>
              }
            >
              <List.Item.Meta
                style={{ marginBottom: 24 }}
                title={`${job.position} @ ${job.company}`}
                description={
                  <>
                    <Typography.Paragraph
                      style={{
                        color: "#888",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                      }}
                    >{`${formatDate(job.started)} - ${job.finished ? formatDate(job.finished) : "Present"}`}</Typography.Paragraph>
                    {job.description.split("\n").map((paragraph) => (
                      <Typography.Paragraph
                        key={paragraph}
                        style={{ margin: "4px 0" }}
                      >
                        {paragraph}
                      </Typography.Paragraph>
                    ))}
                  </>
                }
              />
            </List.Item>
          ))}
        </List>
        <WorkExperienceForm
          isCreating={isCreating}
          isOpen={isOpen}
          data={modalData}
          onCancel={() => {
            setIsOpen(false);
          }}
          onCreate={async (payload) => {
            await onCreate(payload);
            setIsOpen(false);
          }}
          onUpdate={async (id: number, payload) => {
            await onUpdate(id, payload);
            setIsOpen(false);
          }}
        />
      </>
    );
  },
);
