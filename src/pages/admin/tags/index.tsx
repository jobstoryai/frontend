
import React from "react";

import { AuthContainer } from "containers/Auth";
import { NodeTagsContainer } from "containers/NodeTags";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <NodeTagsContainer />
  </AuthContainer>
);

export default Page;
