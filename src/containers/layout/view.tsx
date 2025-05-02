import React, { ReactNode } from "react";
import { Layout } from "antd";

import { JobFormModalContainer } from "containers/job_form_modal";
import { OnboardingContainer } from "containers/onboarding";
import { OnboardingProgressContainer } from "containers/onboarding_progress";
import { RecordFormModalContainer } from "containers/record_form_modal";

import { HeaderContainer } from "../header";

import s from "./style.module.css";
const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export const LayoutView = ({ children }: Props) => {
  return (
    <>
      <Layout className={s.container}>
        <HeaderContainer />
        <Layout className={s.content_outter}>
          <Layout className={s.content}>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: "transparent",
              }}
            >
              <>
                <OnboardingProgressContainer />
                {children}
              </>
            </Content>
            <OnboardingContainer />
            <RecordFormModalContainer />
            <JobFormModalContainer />
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};
