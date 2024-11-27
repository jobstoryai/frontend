import React from "react";
import { observer } from "mobx-react-lite";
import { JobFormContainer } from "containers/JobForm";


const CreateJobFormPage = observer(() => {
  return <JobFormContainer />;
});

export default CreateJobFormPage;

