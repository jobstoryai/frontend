import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import TextArea from "antd/lib/input/TextArea";
import { Button, Card, DatePicker, Form, Row, Space, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RecordPayload } from "repositories/record_repository";
import { MayBeAsync } from "types";

type Payload = RecordPayload;

interface Props {
  isCreating: boolean;
  onSubmit: (payload: Payload) => MayBeAsync<void>;
}

const MAX_TEXT_LENGTH = 240;

export const RecordFormView = observer(({ onSubmit, isCreating }: Props) => {
  const [form] = Form.useForm();
  const content = Form.useWatch("content", form);

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
          <TextArea rows={3} placeholder="Record your new achievement" />
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

          <Typography.Text
            style={{
              color: (content?.length || 0) > MAX_TEXT_LENGTH ? "red" : "#666",
              marginRight: 12,
            }}
          >
            {MAX_TEXT_LENGTH - (content?.length || 0)}
          </Typography.Text>
          <Button type="primary" htmlType="submit">
            Record
          </Button>
        </Row>
      </Form>
    </Card>
  );
});
