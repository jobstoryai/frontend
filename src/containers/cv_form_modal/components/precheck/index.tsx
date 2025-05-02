import {
  CheckCircleFilled,
  CloseCircleOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  StopOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Dropdown, List, Space, Typography } from "antd";
import { BaseType } from "antd/es/typography/Base";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";

import {
  JOB_DESCRIPTION_LENGTH_DANGER,
  JOB_DESCRIPTION_LENGTH_WARNING,
  JOB_RECORDS_COUNT_DANGER,
  JOB_RECORDS_COUNT_WARNING,
} from "config";

import s from "./style.module.css";

interface PreCheckProps {
  isLoading: boolean;
  jobs: Job[];
  excludedJobs?: number[];
  onToggleExcludedJob: (jobId: number) => void;
}

interface Check {
  type: BaseType;
  message: string;
}

interface JobCheck {
  description: Check;
  records: Check;
}

const TEXT = {
  INTRO:
    "Here you can review your data and get feedback on how to improve the quality of the resumes you generate.",
  RECORDS_COUNT_SUCCESS: "All good",
  RECORDS_COUNT_WARNING: "Add more records to improve CV quality",
  RECORDS_COUNT_DANGER: "Add more records to improve CV quality",
  JOB_DESCRIPTION_LENGTH_SUCCESS: "All good",
  JOB_DESCRIPTION_LENGTH_WARNING:
    "Job description is short, add more details to improve CV quality",
  JOB_DESCRIPTION_LENGTH_DANGER:
    "Job description is very short, add more details to improve CV quality",
};

const getRecordsCheck = (job: Job): JobCheck => {
  const retval: JobCheck = {
    records: {
      type: "success",
      message: TEXT.RECORDS_COUNT_SUCCESS,
    },
    description: {
      type: "success",
      message: "All good",
    },
  };
  if (job.records < JOB_RECORDS_COUNT_WARNING) {
    retval.records.type = "warning";
    retval.records.message = TEXT.RECORDS_COUNT_WARNING;
  }

  if (job.records < JOB_RECORDS_COUNT_DANGER) {
    retval.records.type = "danger";
    retval.records.message = TEXT.RECORDS_COUNT_DANGER;
  }

  if (job.description.length < JOB_DESCRIPTION_LENGTH_WARNING) {
    retval.description.type = "warning";
    retval.description.message = TEXT.JOB_DESCRIPTION_LENGTH_WARNING;
  }

  if (job.description.length < JOB_DESCRIPTION_LENGTH_DANGER) {
    retval.description.type = "danger";
    retval.description.message = TEXT.JOB_DESCRIPTION_LENGTH_DANGER;
  }

  return retval;
};

const getWorstType = (types: BaseType[]): BaseType => {
  if (types.includes("danger")) return "danger";
  if (types.includes("warning")) return "warning";
  return "success";
};

export const PreCheck = observer(
  ({
    isLoading,
    jobs = [],
    excludedJobs = [],
    onToggleExcludedJob: onExcludeJob,
  }: PreCheckProps) => {
    return (
      <div>
        <Typography.Text>{TEXT.INTRO}</Typography.Text>
        <List loading={isLoading} style={{ marginTop: 24 }}>
          {jobs.map((job) => {
            const check = getRecordsCheck(job);
            const overallType = getWorstType([
              check.records.type,
              check.description.type,
            ]);
            const isExcluded = excludedJobs.includes(job.id);

            const OverallIcon = ({ state }: { state: string }) => {
              if (state === "success") {
                return <CheckCircleFilled style={{ color: "green" }} />;
              }

              if (state === "warning") {
                return <WarningOutlined style={{ color: "orange" }} />;
              }

              if (state === "danger") {
                return <CloseCircleOutlined style={{ color: "red" }} />;
              }

              if (state === "excluded") {
                return <MinusCircleOutlined />;
              }
            };

            return (
              <List.Item
                key={job.id}
                // actions={[
                //   <Dropdown
                //     key="Dropdown"
                //     className={s.dropdown}
                //     menu={{
                //       items: [
                //         {
                //           label: "View records",
                //           key: "view_records",
                //           icon: <EyeOutlined />,
                //         },
                //         {
                //           label: "Edit job",
                //           key: "edit",
                //           icon: <EditOutlined />,
                //         },
                //         {
                //           label: isExcluded
                //             ? "Include into CV"
                //             : "Exclude from CV",
                //           key: "Deactivate",
                //           icon: isExcluded ? (
                //             <PlusCircleOutlined />
                //           ) : (
                //             <StopOutlined />
                //           ),
                //           onClick: () => onExcludeJob(job.id),
                //         },
                //       ],
                //     }}
                //     trigger={["click"]}
                //   >
                //     <Space>
                //       <EllipsisOutlined style={{ color: "#555" }} />
                //     </Space>
                //   </Dropdown>,
                // ]}
              >
                <List.Item.Meta
                  avatar={
                    <OverallIcon
                      state={isExcluded ? "excluded" : overallType}
                    />
                  }
                  title={
                    isExcluded ? (
                      <s>
                        {job.position} at {job.company}
                      </s>
                    ) : (
                      `${job.position} at ${job.company}`
                    )
                  }
                  description={
                    !isExcluded && (
                      <>
                        <Typography.Paragraph
                          type="secondary"
                          style={{
                            marginTop: -6,
                            marginBottom: 6,
                            fontSize: "0.8rem",
                            letterSpacing: 0.4,
                            textTransform: "uppercase",
                          }}
                        >
                          {format(new Date(job.started), "yyyy-MM-dd")} -{" "}
                          {job.finished
                            ? format(new Date(job.finished), "yyyy-MM-dd")
                            : "Now"}
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                          <ul>
                            <li>
                              <Typography.Text type={check.records.type}>
                                <b>Records</b>: {job.records}.{" "}
                              </Typography.Text>
                              <Typography.Text>
                                {check.records.message}
                              </Typography.Text>
                            </li>
                            <li>
                              <Typography.Text type={check.description.type}>
                                <b>Description</b>: {job.description.length}{" "}
                                symbols.{" "}
                              </Typography.Text>
                              <Typography.Text>
                                {check.description.message}
                              </Typography.Text>
                            </li>
                          </ul>
                        </Typography.Paragraph>
                      </>
                    )
                  }
                />
              </List.Item>
            );
          })}
        </List>
      </div>
    );
  },
);
