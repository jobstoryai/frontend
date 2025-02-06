import React, { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";
import { Button, Card, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { format } from "date-fns";
import { omit } from "lodash";
import { observer } from "mobx-react-lite";

import { Cv, CvPayload } from "repositories/cv_repository";

import { MAX_CV_PROMPT_LENGTH } from "config";

import { MayBeAsync } from "types";

interface Props {
  data: Cv | null;
  isNew: boolean;
  isUpdating: boolean;
  onSubmit: (payload: CvPayload) => MayBeAsync<void>;
  onDelete: () => MayBeAsync<void>;
}

export const CvPageView = observer(
  ({ data, isUpdating, onSubmit, onDelete, isNew }: Props) => {
    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Card
            title="Settings"
            style={{
              marginBottom: 12,
              maxWidth: 800,
              width: "100%",
            }}
            extra={[
              isNew ? null : (
                <Button
                  key="delete"
                  variant="text"
                  color="danger"
                  htmlType="submit"
                  onClick={() => onDelete()}
                >
                  <DeleteOutlined />
                </Button>
              ),
            ]}
          >
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={{
                title: data?.title,
                prompt: data?.prompt,
                status: data?.status,
                created_at: data?.created_at
                  ? format(data.created_at, "yyyy-MM-dd HH:mm")
                  : null,
                updated_at: data?.updated_at
                  ? format(data.updated_at, "yyyy-MM-dd HH:mm")
                  : null,
              }}
              onFinish={(values) => {
                onSubmit(values);
              }}
              autoComplete="off"
            >
              <Form.Item name="title" label="Title">
                <Input placeholder="Title" />
              </Form.Item>
              {!isNew ? (
                <Form.Item name="status" label="Status">
                  <Input placeholder="Status" readOnly variant="borderless" />
                </Form.Item>
              ) : null}
              <Form.Item name="prompt" label="Prompt">
                <TextArea
                  styles={{ textarea: { minHeight: 100 } }}
                  rows={10}
                  maxLength={MAX_CV_PROMPT_LENGTH}
                  showCount
                  autoSize
                  style={{ marginBottom: 20 }}
                  placeholder="Vacancy details, company information, position, etc"
                />
              </Form.Item>

              {!isNew ? (
                <Form.Item name="created_at" label="Created At">
                  <Input readOnly variant="borderless" />
                </Form.Item>
              ) : null}

              {!isNew ? (
                <Form.Item name="updated_at" label="Updated At">
                  <Input readOnly variant="borderless" />
                </Form.Item>
              ) : null}

              <Form.Item label={null}>
                <Button loading={isUpdating} type="primary" htmlType="submit">
                  {isNew ? "Create" : "Save"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    );
  },
);
