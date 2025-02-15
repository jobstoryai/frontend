import React, { FC } from "react";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";
import { RecordPayload } from "repositories/record_repository";

import { MAX_RECORD_LENGTH } from "config";

import { MayBeAsync } from "types";

type Payload = RecordPayload;

interface Props {
  isLoadingJobs: boolean;
  jobs: Job[];
  isCreating: boolean;
  onSubmit: (payload: Payload) => MayBeAsync<void>;
}

export const RecordFormView = observer(
  ({ onSubmit, isCreating, isLoadingJobs, jobs }: Props) => {
    const [form] = Form.useForm();

    return (
      <Card
        style={{
          marginBottom: 12,
          width: "100%",
        }}
      >
        <Form
          name="record"
          form={form}
          initialValues={{
            content: "",
            date: dayjs(),
          }}
          onFinish={(values) => {
            onSubmit(values);
          }}
          autoComplete="off"
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Please add a record content" }]}
          >
            <TextArea
              rows={3}
              showCount
              maxLength={MAX_RECORD_LENGTH}
              placeholder="Record your new achievement"
            />
          </Form.Item>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "flex-start",
            }}
          >
            <Form.Item name="date" style={{ margin: "0 8px 0 0" }}>
              <DatePicker />
            </Form.Item>
            {!isLoadingJobs ? (
              <Form.Item name="job" style={{ margin: "0 8px 0 0" }}>
                <Select style={{ width: 150 }}>
                  {jobs.map((job) => (
                    <Select.Option key={job.id} value={job.id}>
                      {job.company}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            ) : null}
            <div style={{ flexGrow: 1 }} />
            <Button type="primary" htmlType="submit" loading={isCreating}>
              Record
            </Button>
          </Row>
        </Form>
      </Card>
    );
  },
);
