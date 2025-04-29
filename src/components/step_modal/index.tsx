import React, { ReactNode, useState } from "react";
import { Modal } from "antd";

interface Step {
  title?: () => ReactNode;
  component: () => ReactNode;
  footer?: (next: null | (() => void), prev: null | (() => void)) => ReactNode;
}

interface Props {
  steps: Step[];
  isOpen: boolean;
}

export const StepModal = ({ steps, isOpen }: Props) => {
  const [step, setStep] = useState(0);

  const handlePrevStep = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNextStep = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Modal
      open={isOpen}
      closable={false}
      title={steps[step]?.title?.() ?? null}
      footer={
        steps[step]?.footer?.(
          step < steps.length - 1 ? handleNextStep : null,
          step !== 0 ? handlePrevStep : null,
        ) ?? null
      }
    >
      {steps[step].component()}
    </Modal>
  );
};
