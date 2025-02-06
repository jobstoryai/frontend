import React, { FC } from "react";
import { Button, Card, DatePicker, Form, Row, Space, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { observer } from "mobx-react-lite";

import { RecordPayload } from "repositories/record_repository";

import { MAX_RECORD_LENGTH } from "config";

import { MayBeAsync } from "types";

type Payload = RecordPayload;

interface Props {
  isCreating: boolean;
  onSubmit: (payload: Payload) => MayBeAsync<void>;
}

export const RecordFormView = observer(({ onSubmit, isCreating }: Props) => {
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
          }}
        >
          <Form.Item name="date" style={{ margin: 0, flexGrow: 1 }}>
            <DatePicker />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Record
          </Button>
        </Row>
      </Form>
    </Card>
  );
});
