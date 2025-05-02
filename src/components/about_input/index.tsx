import { Typography } from "antd";
import { TextAreaProps } from "antd/lib/input";
import TextArea from "antd/lib/input/TextArea";

import { MAX_USER_ABOUT_LENGTH } from "config";

const PLACEHOLDER_TEXT =
  "Experienced frontend engineer with deep experience in React, MobX, and strong skills in performance optimization, aiming for a tech lead role";

const HELP_TEXT =
  "Summarize your professional focus and interests to highlight your expertise. This information will be used as a base and adapted for each CV.";

export const AboutInput = (props: TextAreaProps) => (
  <>
    <TextArea
      rows={3}
      styles={{ textarea: { minHeight: 80 } }}
      maxLength={MAX_USER_ABOUT_LENGTH}
      showCount
      autoSize
      style={{ marginBottom: 20 }}
      placeholder={PLACEHOLDER_TEXT}
      {...props}
    />
    <Typography.Text
      type="secondary"
      style={{ fontSize: 12, fontStyle: "italic", lineHeight: "8px" }}
    >
      {HELP_TEXT}
    </Typography.Text>
  </>
);
