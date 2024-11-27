import React from "react";

import { AuthContainer } from "containers/Auth";
import { NodeListContainer } from "containers/NodeList";

const AdminSkillPage = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <NodeListContainer />
  </AuthContainer>
);

export default AdminSkillPage;
