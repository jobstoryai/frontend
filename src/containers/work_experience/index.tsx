import React, { useEffect } from "react";
import { JobModalController } from "controllers/job_modal_controller";
import { JobsController } from "controllers/jobs_controller";
import { RecordModalController } from "controllers/record_modal_controller";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { WorkExperienceView } from "./view";

export interface Props {}

export const WorkExperienceContainer = observer(({}: Props) => {
  const controller = useController(JobsController, {});
  const recordModalController = useController(RecordModalController, {});
  const jobModalController = useController(JobModalController, {});

  useEffect(() => {
    controller.load();
  }, [controller]);

  if (controller.state.isLoading) {
    return <Loader />;
  }

  return (
    <WorkExperienceView
      jobs={controller.data.items}
      onOpenRecordModal={({ selectedJob }: { selectedJob: number | null }) => {
        recordModalController.openModal({ selectedJob });
      }}
      onOpenJobModal={(args) => {
        jobModalController.openModal({ data: args?.job || null });
      }}
      onDeleteJob={(id) => {
        controller.delete(id);
      }}
    />
  );
});
