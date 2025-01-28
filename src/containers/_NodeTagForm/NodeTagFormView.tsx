import React from "react";
import { observer } from "mobx-react-lite";
import { NodeTag } from "repositories/NodeTagsRepository";
import { Button, Card, Col, Form, Input, Row, Space } from "antd";
import { FormInstance } from "antd";


interface Props {
  item: NodeTag | null;
  onCreate: (data: NodeTagFormFieldValues, form: FormInstance) => void;
  onUpdate: (id: number, data: NodeTagFormFieldValues, form: FormInstance) => void;
  onDelete: (id: number) => void;
  isModifying: boolean;
}

interface NodeTagFormFieldValues {
  title: string;
}

export const NodeTagFormView = observer(({ item, onCreate, onUpdate, onDelete, isModifying }: Props) => {
  const [form] = Form.useForm();

  return (
    <Row>
      <Col span={24}>
        <Card
          size="small"
          title="Tag"
          extra={
            item?.id ? (
              <Button
                danger
                type="text"
                onClick={() => { onDelete(item.id) }}
              >
                Delete
              </Button>
            ) : null
          }
        >
          <Form
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={(values) => {
              item?.id 
                ? onUpdate(item.id, values, form) 
                : onCreate(values, form);
            }}
            initialValues={{ title: "", ...item }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input a title",
                },
              ]}
            >
              <Input placeholder="Senior Frontend Developer (React)" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Space wrap>
                <Button type="primary" htmlType="submit" loading={isModifying}>
                  {item?.id ? "Save" : "Create"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
});
