import React from "react";

import { AuthContainer } from "containers/Auth";
import { JobListContainer } from "containers/JobList";

const AdminSkillPage = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <JobListContainer />
  </AuthContainer>
);

export default AdminSkillPage;
