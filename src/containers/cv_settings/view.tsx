import React, { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input, List } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { Cv, CvPayload } from "repositories/cv_repository";

import { MAX_CV_PROMPT_LENGTH } from "config";

import { MayBeAsync } from "types";

interface Props {
  data: Cv | null;
  isNew: boolean;
  isUpdating: boolean;
  onSubmit: (payload: CvPayload) => MayBeAsync<void>;
  onDelete: () => MayBeAsync<void>;
  isCreatingVersion: boolean;
  onCreateVersion: () => MayBeAsync<void>;
}

export const CvSettingsView = observer(
  ({
    data,
    isUpdating,
    onSubmit,
    onDelete,
    isNew,
    isCreatingVersion,
    onCreateVersion,
  }: Props) => {
    return (
      <>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{
            company: data?.company,
            position: data?.position,
            job_description: data?.job_description,
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
          <Form.Item name="company" label="Company">
            <Input placeholder="Company" />
          </Form.Item>
          <Form.Item name="position" label="Position">
            <Input placeholder="Position" />
          </Form.Item>
          <Form.Item name="job_description" label="Job Description">
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

          {!isNew && data?.versions.length ? (
            <Form.Item label="History">
              <List size="small" bordered>
                {data.versions
                  .slice()
                  .reverse()
                  .map((version) => (
                    <List.Item key={version.id}>
                      <Link
                        href={`/cvs/preview/${version.id}`}
                        style={{ width: "100%" }}
                      >
                        {format(version.updated_at, "yyyy-MM-dd HH:mm")}
                      </Link>
                    </List.Item>
                  ))}
              </List>
            </Form.Item>
          ) : null}

          <Form.Item label={null}>
            <Flex justify="space-between">
              {/*<Button loading={isCreatingVersion} onClick={onCreateVersion}>
              Create Version
            </Button>*/}

              <Button
                key="delete"
                variant="text"
                icon={<DeleteOutlined />}
                color="danger"
                htmlType="submit"
                onClick={() => onDelete()}
              >
                Delete
              </Button>
              <Button
                loading={isUpdating}
                type="primary"
                htmlType="submit"
                style={{ marginRight: 8 }}
              >
                {isNew ? "Create" : "Save"}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </>
    );
  },
);
