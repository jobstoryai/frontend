import React from "react";
import { useRouter } from "next/router";

import { AuthContainer } from "containers/auth";
import { CvVersionPreviewContainer } from "containers/cv_version_preview";

const Page = () => {
  const router = useRouter();
  const { version_id } = router.query;

  if (!version_id) {
    return null;
  }

  return (
    <AuthContainer redirectUnauthenticated="/login">
      <CvVersionPreviewContainer versionId={String(version_id)} />
    </AuthContainer>
  );
};

export default Page;
