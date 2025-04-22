import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";

import { MayBeAsync } from "types";

interface Props {
  onCancel: () => MayBeAsync<void>;
  data: Job | null;
  isOpen: boolean;
  isCreating: boolean;
  onCreate: (payload: FormData) => MayBeAsync<void>;
  onUpdate: (id: number, payload: FormData) => MayBeAsync<void>;
}

interface FormData {
  company: string;
  position: string;
  description: string;
  started: Date;
  finished: Date | null;
  current_job: boolean;
}

export const WorkExperienceForm = observer(
  ({ isOpen, isCreating, onCancel, onCreate, onUpdate, data }: Props) => {
    const [form] = useForm();
    const [isCurrentJob, setIsCurrentJob] = useState(false);

    useEffect(() => {
      if (data && form && isOpen) {
        form.setFieldsValue({
          company: data.company,
          position: data.position,
          description: data.description,
          started: dayjs(data.started),
          finished: data.finished ? dayjs(data.finished) : null,
          current_job: data.finished === null,
        });
        setIsCurrentJob(!data.finished);
      }
    }, [data, form, isOpen]);

    const handleValuesChange = (changedValues: Partial<FormData>) => {
      if (changedValues.current_job !== undefined) {
        if (changedValues.current_job) {
          form.setFieldsValue({ finished: null });
        }
      }
    };

    console.log("isCurrentJob", isCurrentJob);

    return (
      <Modal
        title={data?.id ? "Edit Working Experince" : "Add Working Experince"}
        footer={
          <Button
            type="primary"
            onClick={() => form.submit()}
            loading={isCreating}
          >
            {data?.id ? "Update" : "Create"}
          </Button>
        }
        open={isOpen}
        onCancel={() => {
          form.resetFields();
          setIsCurrentJob(false);
          onCancel();
        }}
      >
        <Form<FormData>
          form={form}
          labelCol={{ span: 4 }}
          style={{ marginTop: 32 }}
          wrapperCol={{ span: 20 }}
          initialValues={
            data
              ? {
                  ...data,
                  started: dayjs(data.started),
                  finished: data.finished ? dayjs(data.finished) : null,
                }
              : {
                  company: "",
                  position: "",
                  description: "",
                  started: dayjs(),
                  finished: dayjs(),
                }
          }
          onFinish={async (payload) => {
            const { current_job, ..._payload } = {
              ...payload,
              finished: payload.finished ?? null,
            };

            try {
              data?.id
                ? await onUpdate(data.id, _payload as any)
                : await onCreate(_payload as any);
              form.resetFields();
              setIsCurrentJob(false);
            } catch (e) {
              console.error(e);
            }
          }}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Form.Item
            name="company"
            label="Company"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <TextArea showCount maxLength={2000} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                name="started"
                label="Started"
                labelCol={{ xs: { span: 8 } }}
                wrapperCol={{ xs: { span: 16 } }}
                rules={[
                  {
                    required: true,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col xs={12}>
              <Form.Item
                name="finished"
                label="Finished"
                labelCol={{ xs: { span: 8 } }}
                wrapperCol={{ xs: { span: 16 } }}
                rules={[
                  {
                    required: !isCurrentJob,
                    message: "Required",
                  },
                ]}
              >
                <DatePicker
                  placeholder={
                    isCurrentJob ? "Currently employed" : "Select date"
                  }
                  disabled={isCurrentJob}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="current_job"
                label="Currently Employed"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                valuePropName="checked"
              >
                <Checkbox
                  checked={isCurrentJob}
                  onChange={(e: { target: { checked: boolean } }) => {
                    const isChecked = e.target.checked;
                    setIsCurrentJob(e.target.checked);

                    if (isChecked) {
                      form.setFields([
                        {
                          name: "finished",
                          errors: [],
                          value: null,
                        },
                      ]);
                    }
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  },
);
