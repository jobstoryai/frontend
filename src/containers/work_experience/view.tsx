import React from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, List, Space, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { formatDateYYYYMM } from "lib/format_date";
import { Job } from "repositories/job_repository";

import { MayBeAsync } from "types";

interface Props {
  jobs: Job[];
  onDeleteJob: (id: number) => MayBeAsync<void>;
  onOpenRecordModal: (args: { selectedJob: number | null }) => void;
  onOpenJobModal: (args?: { job: Job | null }) => void;
}

export const WorkExperienceView = observer(
  ({ jobs, onOpenRecordModal, onOpenJobModal, onDeleteJob }: Props) => {
    return (
      <>
        <Card
          style={{ width: "100%" }}
          bodyStyle={{ padding: 0, overflowY: "scroll", maxHeight: "80vh" }}
          title="Your Jobs"
          extra={[
            <Button
              key={"add-job-button"}
              type={jobs.length ? "default" : "primary"}
              icon={<SolutionOutlined />}
              onClick={() => {
                onOpenJobModal();
              }}
            >
              Add Job
            </Button>,
          ]}
        >
          <div style={{ padding: 25 }}>
            {!jobs.length && (
              <Empty
                styles={{ image: { height: 60 } }}
                style={{ margin: "40px 0 60px" }}
                description={
                  <Typography.Text type="secondary">
                    You don't have any jobs yet!
                  </Typography.Text>
                }
              >
                <Button
                  type="primary"
                  onClick={() => {
                    onOpenJobModal();
                  }}
                >
                  Add Job
                </Button>
              </Empty>
            )}

            {jobs.length ? (
              <List>
                {jobs.map((job) => (
                  <List.Item
                    key={job.id}
                    actions={[
                      <Space
                        key={"dropdown"}
                        direction="vertical"
                        align="start"
                        size="small"
                      >
                        <Button
                          icon={<EditOutlined />}
                          variant="link"
                          size="small"
                          color="default"
                          onClick={() => onOpenJobModal({ job: job })}
                        >
                          Edit
                        </Button>

                        <Button
                          icon={<PlusOutlined />}
                          variant="link"
                          size="small"
                          color="default"
                          onClick={() => {
                            onOpenRecordModal({ selectedJob: job.id });
                          }}
                        >
                          Record
                        </Button>
                        <Button
                          icon={<DeleteOutlined />}
                          size="small"
                          color="danger"
                          variant="link"
                          onClick={() => onDeleteJob(job.id)}
                        >
                          Delete
                        </Button>
                      </Space>,
                    ]}
                  >
                    <List.Item.Meta
                      style={{ marginBottom: 24 }}
                      title={
                        <>
                          <Typography.Text style={{ marginRight: 10 }}>
                            {job.position}{" "}
                            <Typography.Text type="secondary">
                              {" @ "}
                            </Typography.Text>
                            {job.company}
                          </Typography.Text>
                          <Typography.Text
                            type="secondary"
                            style={{ fontWeight: 300 }}
                          >
                            {formatDateYYYYMM(job.started)}
                            {" - "}
                            {job.finished
                              ? formatDateYYYYMM(job.finished)
                              : "Present"}
                          </Typography.Text>
                        </>
                      }
                      description={
                        <>
                          <Typography.Paragraph
                            type={job.records < 5 ? "danger" : "success"}
                            style={{
                              margin: "-4px 0 12px",
                              paddingRight: 8,
                              opacity: 0.75,
                            }}
                          >
                            Records: {job.records}
                          </Typography.Paragraph>

                          {job.description.split("\n").map((paragraph) => (
                            <>
                              <Typography.Paragraph
                                style={{ margin: "4px 0", paddingRight: 8 }}
                              >
                                {paragraph}
                              </Typography.Paragraph>
                            </>
                          ))}
                        </>
                      }
                    />
                  </List.Item>
                ))}
              </List>
            ) : null}
          </div>
        </Card>
      </>
    );
  },
);
