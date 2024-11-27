import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { JobFormContainer } from "containers/JobForm";

const JobFormPage = observer(() => {
  const router = useRouter();
  const { jobId } = router.query;

  if (!jobId) {
    return null;
  }

  return <JobFormContainer id={Number(jobId)} />;
});

export default JobFormPage;
