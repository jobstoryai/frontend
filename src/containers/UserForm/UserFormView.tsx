import React from "react";
import { observer } from "mobx-react-lite";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { DebounceSelect } from "components/DebounceSelect";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Profile } from "repositories/ProfileRepository";
import { FormInstance } from "antd/lib";

interface Props {
  isLoading: boolean;
  isModifying: boolean;
  data: Profile;
  onUpdate: (
    username: string,
    data: ProfileFieldValues,
    form: FormInstance,
  ) => void;
  onSearch: (s: string) => Promise<{ label: string; value: string | number }[]>;
}

interface ProfileFieldValues {}

const DATE_FORMAT = "DD-MM-YYYY";

export const UserFormView = observer(
  ({ data, onUpdate, onSearch, isModifying }: Props) => {
    const [form] = Form.useForm();

    return (
      <>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} xl={{ span: 16, offset: 4 }}>
            <Card size="small" title="Profile">
              <Form
                form={form}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                onFinish={(values) => {
                  onUpdate(
                    data.user,
                    {
                      ...values,
                      knowledge: values.knowledge.map((item: any) => ({
                        id: item,
                        profiency_level: 50, // TODO: Hardcode
                      })),
                      work_experience: values.work_experience.map(
                        (item: any) => ({
                          ...item,
                          primary_skills: item.primary_skills
                            ? item.primary_skills
                            : [],
                          secondary_skills: item.secondary_skills
                            ? item.secondary_skills
                            : [],
                        }),
                      ),
                    },
                    form,
                  );
                }}
                initialValues={{
                  ...data,
                  knowledge: data.knowledge.map((i: any) => i.id),
                  work_experience: data.work_experience.map(
                    (work_experience: any) => ({
                      ...work_experience,
                      started: dayjs(work_experience.started),
                      finished: dayjs(work_experience.finished),
                      primary_skills: work_experience.primary_skills.map(
                        (i: any) => i.id,
                      ),
                      secondary_skills: work_experience.secondary_skills.map(
                        (i: any) => i.id,
                      ),
                    }),
                  ),
                }}
              >
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please fill this field",
                    },
                  ]}
                >
                  <Input placeholder="John" />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please fill this field",
                    },
                  ]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>
                <Form.Item label="Job Title" name={"job_title"}>
                  <Input placeholder="Desired Job Title" />
                </Form.Item>
                <Form.Item
                  label="About"
                  name="about"
                  rules={[
                    {
                      required: true,
                      message: "Please fill this field",
                    },
                  ]}
                >
                  <Input.TextArea
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    placeholder="About..."
                  />
                </Form.Item>

                <Form.Item label="Knowledge" name={["knowledge"]}>
                  <DebounceSelect
                    mode="multiple"
                    color="#E9B"
                    placeholder="Select Skills"
                    showSearch
                    initialOptions={data.knowledge.map((node) => ({
                      label: node.title,
                      value: node.id,
                    }))}
                    fetchOptions={onSearch}
                  />
                </Form.Item>

                <Form.Item label="Work Experience">
                  <Form.List name={["work_experience"]}>
                    {(fields, opt) => (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: 16,
                        }}
                      >
                        {fields.map((field) => {
                          return (
                            <Card key={field.key}>
                              <Form.Item
                                label="Company"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "company"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please fill this field",
                                  },
                                ]}
                              >
                                <Input placeholder="Company Name" />
                              </Form.Item>
                              <Form.Item
                                label="Job Title"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "job_title"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please fill this field",
                                  },
                                ]}
                              >
                                <Input placeholder="Job Title" />
                              </Form.Item>
                              <Form.Item
                                label="Started"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "started"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please fill this field",
                                  },
                                ]}
                              >
                                <DatePicker
                                  format={DATE_FORMAT}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                              <Form.Item
                                label="Finished"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "finished"]}
                              >
                                <DatePicker
                                  format={DATE_FORMAT}
                                  style={{ width: "100%" }}
                                />
                              </Form.Item>
                              <Form.Item
                                label="Description"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "description"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please fill this field",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  autoSize={{ minRows: 2, maxRows: 6 }}
                                  placeholder="Description"
                                />
                              </Form.Item>

                              <Form.Item
                                label="Primary Skills"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "primary_skills"]}
                              >
                                <DebounceSelect
                                  mode="multiple"
                                  color="#E9B"
                                  placeholder="Select Skills"
                                  showSearch
                                  initialOptions={data.work_experience[
                                    field.key
                                  ]?.primary_skills.map((node) => ({
                                    label: node.title,
                                    value: node.id,
                                  }))}
                                  fetchOptions={onSearch}
                                />
                              </Form.Item>

                              <Form.Item
                                label="Secondary Skills"
                                labelCol={{ style: { width: 120 } }}
                                name={[field.name, "secondary_skills"]}
                              >
                                <DebounceSelect
                                  mode="multiple"
                                  color="#9BE"
                                  placeholder="Select Skills"
                                  showSearch
                                  initialOptions={data.work_experience[
                                    field.key
                                  ]?.secondary_skills.map((node) => ({
                                    label: node.title,
                                    value: node.id,
                                  }))}
                                  fetchOptions={onSearch}
                                />
                              </Form.Item>

                              <Space.Compact style={{ width: "100%" }}>
                                <Button
                                  danger
                                  icon={<CloseOutlined />}
                                  onClick={() => opt.remove(field.name)}
                                  block
                                >
                                  Remove
                                </Button>
                              </Space.Compact>
                            </Card>
                          );
                        })}
                        <Button
                          icon={<PlusOutlined />}
                          onClick={() => opt.add()}
                          block
                        >
                          Add Work Experience
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    loading={isModifying}
                  >
                    Save
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    );
  },
);
