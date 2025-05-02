import React from "react";
import { Button, Modal, Typography } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingAddJobModal = observer(({ isOpen, onClose }: Props) => {
  return (
    <Modal
      open={isOpen}
      closable={false}
      footer={
        <>
          <Button type="primary" onClick={onClose}>
            Add job
          </Button>
        </>
      }
    >
      <div style={{ maxHeight: "60vh", overflow: "auto", paddingTop: 24 }}>
        <div>
          <Image
            src={"/illustrations/adding-jobs.jpg"}
            width={1536}
            height={1024}
            alt="greeting"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Typography.Paragraph>
            <b>Let's create your first job!</b> Fill in the company name,
            position, dates, and briefly describe the company and your role
            there.
          </Typography.Paragraph>
        </div>
      </div>
    </Modal>
  );
});
