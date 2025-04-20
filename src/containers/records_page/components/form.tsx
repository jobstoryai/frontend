import { useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";
import { Record } from "repositories/record_repository";

import { MAX_RECORD_LENGTH } from "config";

import { MayBeAsync } from "types";

interface Props {
  onCancel: () => MayBeAsync<void>;
  data: Record | null;
  jobs: Job[];
  isOpen: boolean;
  isCreating: boolean;
  isLoadingJobs: boolean;
  onCreate: (payload: FormData) => MayBeAsync<void>;
  onUpdate: (id: number, payload: FormData) => MayBeAsync<void>;
}

interface FormData {
  content: string;
  date: Date;
  job: number;
}

export const RecordFormModal = observer(
  ({
    isOpen,
    isCreating,
    isLoadingJobs,
    jobs,
    onCancel,
    onCreate,
    onUpdate,
    data,
  }: Props) => {
    const [form] = useForm();

    useEffect(() => {
      if (data && form && isOpen) {
        form.setFieldsValue({
          content: data.content || "",
          date: data.date ? dayjs(data.date) : dayjs(),
          job: data.job?.id || null,
        });
      }
    }, [data, form, isOpen]);

    return (
      <Modal
        title={data?.id ? "Edit Record" : "Add Record"}
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
        <Form
          name="record"
          form={form}
          labelCol={{ span: 3 }}
          initialValues={
            data?.id
              ? {
                  content: data.content,
                  date: dayjs(data.date),
                  job: data.job,
                }
              : {
                  content: "",
                  date: dayjs(),
                }
          }
          onFinish={async (values) => {
            data?.id ? await onUpdate(data.id, values) : await onCreate(values);
            form.resetFields();
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
          <Row gutter={16}>
            <Col xs={12}>
              {!isLoadingJobs ? (
                <Form.Item
                  name="job"
                  label="Job"
                  required
                  style={{ marginBottom: 4 }}
                  labelCol={{ xs: 6 }}
                  wrapperCol={{ xs: 18 }}
                >
                  <Select size="small" style={{ width: "100%" }}>
                    {jobs.map((job) => (
                      <Select.Option key={job.id} value={job.id}>
                        {job.company}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : null}
            </Col>
            <Col xs={12}>
              <Form.Item
                name="date"
                label="Date"
                labelCol={{ xs: 6 }}
                wrapperCol={{ xs: 18 }}
              >
                <DatePicker size="small" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  },
);
