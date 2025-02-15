import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Form, List, Typography } from "antd";
import TextArea, { TextAreaProps } from "antd/lib/input/TextArea";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";
import { UserSettings } from "repositories/user_settings";

import { MAX_USER_PROMPT_LENGTH } from "config";

import { MayBeAsync } from "types";

interface FormValues {
  user_prompt: string;
}

interface Props {
  isUpdating: boolean;
  jobs: Job[];
  data: UserSettings;
  onSubmit: (payload: FormValues) => MayBeAsync<void>;
}

const SystemPromptInput = (props: TextAreaProps) => (
  <>
    <TextArea
      rows={10}
      styles={{ textarea: { minHeight: 200 } }}
      maxLength={MAX_USER_PROMPT_LENGTH}
      showCount
      autoSize
      style={{ marginBottom: 20 }}
      placeholder={
        "- [2012 - 2014] Good Company\r  ROLE: Frontend Engineer\r  STACK: React, Mobx, Stylus\r\r- [2014 - 2019] Awesome Devs\r  ROLE: CTO\r  STACK: Jira, Confluence, Gantt Charts"
      }
      {...props}
    />
    <Typography.Text
      type="secondary"
      style={{ fontSize: 12, fontStyle: "italic", lineHeight: "8px" }}
    >
      This system prompt applies to all your CVs. Use it to describe your work
      experience, skills, industries you&apos;ve worked in, and any key details
      that should be included in your resumes.
    </Typography.Text>
  </>
);

export const SettingsPageView = observer(
  ({ isUpdating, data, onSubmit, jobs }: Props) => {
    const [form] = Form.useForm();

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          title="Settings"
          style={{
            marginBottom: 12,
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{
              user_prompt: data.user_prompt,
            }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item name="user_prompt" label="User Prompt">
              <SystemPromptInput />
            </Form.Item>

            <Form.Item label="Jobs">
              <List>
                {jobs.map((job) => (
                  <List.Item key={job.id}>
                    <Card
                      style={{
                        width: "100%",
                        boxShadow: "0 0 3px rgba(0,0,0,.1)",
                      }}
                      title={`${job.position} @ ${job.company}`}
                      extra={<EllipsisOutlined />}
                    >
                      <strong>Started:</strong>{" "}
                      {format(job.started, "yyyy-MM-dd")}
                      <br />
                      <strong>Finished:</strong>{" "}
                      {job.finished
                        ? format(job.finished, "yyyy-MM-dd")
                        : "Present"}
                      <br />
                      <Typography.Paragraph style={{ marginTop: 8 }}>
                        {job.description}
                      </Typography.Paragraph>
                    </Card>
                  </List.Item>
                ))}
              </List>
            </Form.Item>

            <Form.Item label={null}>
              <Button loading={isUpdating} type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  },
);
