import React, { useEffect } from "react";
import { JobFormView } from "./JobFormView";
import { JobFormController } from "./JobFormController";
import { useController } from "lib/useController";
import { Loader } from "components/Loader";
import { observer } from "mobx-react-lite";
import Router from "next/router";

export interface Props {
  id?: number;
}

export const JobFormContainer = observer(({ id }: Props) => {
  const jobFormController = useController(JobFormController, {});

  useEffect(() => {
    if ("number" === typeof id) {
      jobFormController.load(id);
    }
  }, [id]);

  const isLoading =
    jobFormController.isLoading ||
    (Boolean(id) && Boolean(!jobFormController.data));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <JobFormView
      item={jobFormController.data as any}
      onCreate={async (values, form) => {
        await jobFormController.create(values as any);
        form.resetFields()
      }}
      onUpdate={async (id, values) => {
        await jobFormController.update(id, values);
        Router.replace("/admin/jobs/");
      }}
      isModifying={jobFormController.isModifying}
      onSearch={jobFormController.onSearch}
    />
  );
});
