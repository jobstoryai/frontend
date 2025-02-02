import React from "react";

import { AuthContainer } from "containers/Auth";
import { RecordsPageContainer } from "containers/RecordsPage";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <RecordsPageContainer />
  </AuthContainer>
);

export default Page;
