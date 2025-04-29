import React from "react";

import { PageWrapper } from "components/page_wrapper";
import { AuthContainer } from "containers/auth";
import { WorkExperienceContainer } from "containers/work_experience";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <PageWrapper>
      <WorkExperienceContainer />
    </PageWrapper>
  </AuthContainer>
);

export default Page;
