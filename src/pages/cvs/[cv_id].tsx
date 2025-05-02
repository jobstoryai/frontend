import React from "react";
import { useRouter } from "next/router";

import { PageWrapper } from "components/page_wrapper";
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
      <PageWrapper>
        <CvPageContainer cvId={Number(cv_id)} />
      </PageWrapper>
    </AuthContainer>
  );
};

export default Page;
