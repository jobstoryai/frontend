import React from "react";

import { AuthContainer } from "containers/auth";
import { RecordsPageContainer } from "containers/records_page";

const Page = () => (
  <AuthContainer redirectUnauthenticated="/login">
    <RecordsPageContainer />
  </AuthContainer>
);

export default Page;
