import { useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row } from "antd";
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
}

export const WorkExperienceForm = observer(
  ({ isOpen, isCreating, onCancel, onCreate, onUpdate, data }: Props) => {
    const [form] = useForm();

    useEffect(() => {
      if (data && form && isOpen) {
        form.setFieldsValue({
          company: data.company,
          position: data.position,
          description: data.description,
          started: dayjs(data.started),
          finished: data.finished ? dayjs(data.finished) : null,
        });
      }
    }, [data, form, isOpen]);

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
        onCancel={onCancel}
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
          onFinish={(payload) => {
            const _payload = { ...payload, finished: payload.finished ?? null };
            data?.id ? onUpdate(data.id, _payload) : onCreate(_payload);
          }}
          autoComplete="off"
        >
          <Form.Item name="company" label="Company">
            <Input />
          </Form.Item>
          <Form.Item name="position" label="Position">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea showCount maxLength={2000} />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={12}>
              <Form.Item
                name="started"
                label="Started"
                labelCol={{ xs: { span: 8 } }}
                wrapperCol={{ xs: { span: 16 } }}
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
              >
                <DatePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  },
);
