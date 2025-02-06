import React from "react";
import { useRouter } from "next/router";

import { AuthContainer } from "containers/auth";
import { CvPageContainer } from "containers/cv_page";

const Page = () => {
  return (
    <AuthContainer redirectUnauthenticated="/login">
      <CvPageContainer />
    </AuthContainer>
  );
};

export default Page;
