import { ReactNode } from "react";
import { Button } from "antd";
import Image from "next/image";

import { StepModal } from "components/step_modal";

interface Props {
  isOpen: boolean;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  content: ReactNode;
  button: {
    text: string;
    onClick: () => void;
  };
}

export const OnboardingModal = ({ isOpen, image, content, button }: Props) => {
  return (
    <StepModal
      isOpen={isOpen}
      steps={[
        {
          component: () => (
            <>
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {content}
            </>
          ),
          footer: () => (
            <Button type="primary" onClick={button.onClick}>
              {button.text}
            </Button>
          ),
        },
      ]}
    />
  );
};
