import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react-lite";

import { Job } from "repositories/job_repository";

import { MAX_CV_PROMPT_LENGTH } from "config";

import { MayBeAsync } from "types";

import { PreCheck } from "./components/precheck";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onSubmit: (values: FormData) => MayBeAsync<void>;
  isLoadingJobs: boolean;
  jobs: Job[];
}

interface FormData {
  position: string;
  company: string;
  job_description: string;
}

export const CvFormModalView = observer(
  ({ isOpen, onCancel, onSubmit, isLoadingJobs, jobs }: Props) => {
    const [step, setStep] = useState(0);
    const [excludedJobs, setExcludedJobs] = useState<number[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();

    const steps = [
      {
        title: "Review and Update Your Information",
        component: () => (
          <PreCheck
            isLoading={isLoadingJobs}
            jobs={jobs}
            excludedJobs={excludedJobs}
            onToggleExcludedJob={(jobId) => {
              excludedJobs.includes(jobId)
                ? setExcludedJobs(excludedJobs.filter((id) => id !== jobId))
                : setExcludedJobs([...excludedJobs, jobId]);
            }}
          />
        ),
      },
      {
        title: "Add Job Details",
        component: () => (
          <Form
            form={form}
            wrapperCol={{ span: 24 }}
            labelCol={{ span: 6 }}
            style={{ marginTop: 32 }}
            onFinish={async (values) => {
              setIsSubmitting(true);
              await onSubmit(values);
              setIsSubmitting(false);
            }}
            autoComplete="off"
          >
            <Form.Item
              name="position"
              label="Position"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Position" />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder="Company" />
            </Form.Item>
            <Form.Item
              name="job_description"
              label="Job Description"
              rules={[{ required: true, message: "Required" }]}
            >
              <TextArea
                styles={{ textarea: { minHeight: 100 } }}
                rows={10}
                maxLength={MAX_CV_PROMPT_LENGTH}
                showCount
                autoSize
                style={{ marginBottom: 20 }}
                placeholder="Paste vacancy details here"
              />
            </Form.Item>
            <Form.Item>
              <Typography.Text
                type="secondary"
                style={{ fontSize: 12, fontStyle: "italic", lineHeight: "8px" }}
              >
                Paste the job description here, or write down the key details.
              </Typography.Text>
            </Form.Item>
          </Form>
        ),
      },
    ];

    // handle form reset
    useEffect(() => {
      if (!isOpen) {
        setStep(0);
      }
    }, [isOpen]);

    const handlePrevStep = () => {
      if (step > 0) {
        setStep((prev) => prev - 1);
      }
    };

    const handleNextStep = () => {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1);
      } else {
        form.submit();
      }
    };

    return (
      <Modal
        title={steps[step].title}
        width={"60vw"}
        footer={
          <>
            <Button type="default" onClick={onCancel}>
              Cancel
            </Button>
            {step > 0 && (
              <Button type="default" onClick={handlePrevStep}>
                Back
              </Button>
            )}
            <Button
              type="primary"
              onClick={handleNextStep}
              loading={isSubmitting}
            >
              {step < steps.length - 1 ? "Next" : "Finish"}
            </Button>
          </>
        }
        open={isOpen}
        onCancel={onCancel}
      >
        <div style={{ maxHeight: "60vh", overflow: "auto" }}>
          {steps[step].component()}
        </div>
      </Modal>
    );
  },
);
