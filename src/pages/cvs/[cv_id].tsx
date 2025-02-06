import React from "react";
import { useRouter } from "next/router";

import { AuthContainer } from "containers/auth";
import { CvPageContainer } from "containers/cv_page";

const Page = () => {
  const router = useRouter();
  const { cv_id } = router.query;

  if (!cv_id) {
    return null;
  }

  return (
    <AuthContainer redirectUnauthenticated="/login">
      <CvPageContainer cvId={Number(cv_id)} />
    </AuthContainer>
  );
};

export default Page;
