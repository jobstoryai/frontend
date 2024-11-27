import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Job } from "repositories/JobRepository";
import { Button, Card, Col, Form, Input, Row, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { DebounceSelect } from "components/DebounceSelect";
import { FormInstance } from "antd/lib";
import { createInitialValues } from "./lib";
// @ts-ignore
import { codes as countryCodes } from "iso-country-codes";

interface Props {
  item: Job | null;
  onCreate: (data: JobFormFieldValues, form: FormInstance) => void;
  onUpdate: (id: number, data: JobFormFieldValues, form: FormInstance) => void;
  onSearch: (s: string) => Promise<{ label: string; value: string | number }[]>;
  isModifying: boolean;
}

interface JobFormFieldValues {
  title: string;
  content: string;
  company: string;
  url: string;
  required_skills: { label: string; value: string | number }[];
  good_to_have_skills: { label: string; value: string | number }[];
}

export const JobFormView = observer(
  ({ item, onCreate, onUpdate, onSearch, isModifying }: Props) => {
    const [form] = Form.useForm();

    return (
      <Row>
        <Col span={24}>
          <Card size="small" title="Job">
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              onFinish={(values) => {
                item?.id
                  ? onUpdate(item.id, values, form)
                  : onCreate(values, form);
              }}
              initialValues={createInitialValues(item)}
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
              <Form.Item label="Content" name="content">
                <TextArea placeholder="Content..." />
              </Form.Item>
              <Form.Item
                label="URL"
                name="url"
                rules={[
                  {
                    required: true,
                    message: "Please input an URL",
                  },
                ]}
              >
                <Input placeholder="https://" />
              </Form.Item>
              <Form.Item
                label="Company"
                name="company"
                rules={[
                  {
                    required: true,
                    message: "Please input a company name",
                  },
                ]}
              >
                <Input placeholder="Good Corp" />
              </Form.Item>

              <Form.Item label="Country" name="country">
                <Select
                  showSearch
                  placeholder="Select Country"
                  style={{ width: 240 }}
                  options={countryCodes.map(
                    (country: { name: string; alpha3: string }) => ({
                      label: country.name,
                      value: country.alpha3,
                    }),
                  )}
                />
              </Form.Item>

              <Form.Item label="City" name="city">
                <Input placeholder="HCMC" />
              </Form.Item>

              <Form.Item name={["required_skills"]} label="Required Skills">
                <DebounceSelect
                  mode="multiple"
                  color="#E9B"
                  placeholder="Select Required Skills"
                  showSearch
                  initialOptions={item?.required_skills.map((node) => ({
                    label: node.title,
                    value: node.id,
                  }))}
                  fetchOptions={onSearch}
                />
              </Form.Item>

              <Form.Item
                name={["good_to_have_skills"]}
                label="Good to Have Skills"
              >
                <DebounceSelect
                  color="#9BE"
                  mode="multiple"
                  placeholder="Select Good to Have Skills"
                  showSearch
                  initialOptions={item?.good_to_have_skills.map((node) => ({
                    label: node.title,
                    value: node.id,
                  }))}
                  fetchOptions={onSearch}
                />
              </Form.Item>

              <Form.Item label="Salary From" name="salary_from">
                <Input placeholder="9999" />
              </Form.Item>

              <Form.Item label="Salary To" name="salary_to">
                <Input placeholder="9999" />
              </Form.Item>

              <Form.Item label="Currency" name="currency">
                <Select
                  placeholder="Select Currency"
                  style={{ width: 240 }}
                  options={[
                    { label: "Ruble", value: "RUB" },
                    { label: "USD", value: "USD" },
                  ]}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Space wrap>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isModifying}
                  >
                    {item?.id ? "Save" : "Create"}
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  },
);
