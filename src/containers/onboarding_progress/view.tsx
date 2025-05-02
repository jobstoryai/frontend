import React from "react";
import { Steps } from "antd";
import { observer } from "mobx-react-lite";
import Link from "next/link";

interface Props {
  records: number;
  cvsVersions: number;
  jobs: number;
}

export const OnboardingProgressView = observer(
  ({ records, cvsVersions, jobs }: Props) => {
    let step = 0;
    if (jobs > 0) {
      step = 1;
    }
    if (jobs > 0 && records >= 3) {
      step = 2;
    }

    if (jobs > 0 && records >= 3 && cvsVersions > 0) {
      step = 3;
    }

    return (
      <Steps
        style={{ marginBottom: 24 }}
        current={step}
        items={[
          {
            title: <Link href="/jobs">Create a Job</Link>,
          },
          {
            title: <Link href="/records">Create 3 Records</Link>,
            subTitle: `${records} / 3`,
          },
          {
            title: <Link href="/cvs">Create a Resume</Link>,
          },
        ]}
      />
    );
  },
);
