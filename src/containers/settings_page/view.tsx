import React from "react";
import { Card, Tabs } from "antd";
import { observer } from "mobx-react-lite";

import { PageWrapper } from "components/page_wrapper";
import { ProfileSettingsContainer } from "containers/profile_settings";
import { WorkExperienceSettingsContainer } from "containers/work_experience_settings";

interface Props {}

export const SettingsPageView = observer(({}: Props) => {
  return (
    <PageWrapper>
      <Card style={{ width: "100%" }} title="Profile Settings">
        <Tabs
          defaultActiveKey="profile"
          items={[
            {
              key: "about",
              label: "Profile",
              children: <ProfileSettingsContainer />,
            },
            {
              key: "experience",
              label: "Working Experience",
              children: <WorkExperienceSettingsContainer />,
            },
          ]}
        ></Tabs>
      </Card>
    </PageWrapper>
  );
});
