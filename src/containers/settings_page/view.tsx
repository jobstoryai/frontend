import React from "react";
import { Button, Card, Form, Typography } from "antd";
import TextArea, { TextAreaProps } from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";

import { UserSettings } from "repositories/user_settings";

import { MAX_SYSTEM_PROMPT_LENGTH } from "config";

import { MayBeAsync } from "types";

interface FormValues {
  system_prompt: string;
}

interface Props {
  isUpdating: boolean;
  data: UserSettings;
  onSubmit: (payload: FormValues) => MayBeAsync<void>;
}

const SystemPromptInput = (props: TextAreaProps) => (
  <>
    <TextArea
      rows={10}
      styles={{ textarea: { minHeight: 200 } }}
      maxLength={MAX_SYSTEM_PROMPT_LENGTH}
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
  ({ isUpdating, data, onSubmit }: Props) => {
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
              system_prompt: data.system_prompt,
            }}
            onFinish={onSubmit}
            autoComplete="off"
          >
            <Form.Item name="system_prompt" label="System Prompt">
              <SystemPromptInput />
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
