import { Typography } from "antd";
import { TextAreaProps } from "antd/lib/input";
import TextArea from "antd/lib/input/TextArea";

import { MAX_USER_ABOUT_LENGTH } from "config";

const PLACEHOLDER_TEXT =
  "Share a quick overview of your career focus and expertise, like 'Seasoned CTO with a passion for aligning technology with business goals.'";
const HELP_TEXT =
  "This input will shape your CVs tailored for each job. Summarize your professional focus and achievements to showcase your expertise effectively.";

export const AboutInput = (props: TextAreaProps) => (
  <>
    <TextArea
      rows={10}
      styles={{ textarea: { minHeight: 200 } }}
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
