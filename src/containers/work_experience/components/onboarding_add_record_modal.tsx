import React from "react";
import { Button, Modal, Typography } from "antd";
import { observer } from "mobx-react-lite";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingAddRecordModal = observer(
  ({ isOpen, onClose }: Props) => {
    return (
      <Modal
        open={isOpen}
        closable={false}
        footer={
          <>
            <Button type="primary" onClick={onClose}>
              Add Record
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
              <b>
                You've just added your first job! Now let's add 3 Records to it.
              </b>
              <br />A Record is anything you achieved — features you built,
              goals you reached, challenges you solved, or any other
              contributions you made to projects. You can describe them in any
              style, but for better results, it's best to follow the{" "}
              <a
                href="https://www.linkedin.com/advice/0/how-do-you-use-par-problem-action-result-method"
                rel="nofollow"
                target="_blank"
              >
                PAR method
              </a>
              : Problem → Action → Result.
            </Typography.Paragraph>
          </div>
        </div>
      </Modal>
    );
  },
);
