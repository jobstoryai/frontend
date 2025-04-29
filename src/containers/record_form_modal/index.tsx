import React, { useEffect } from "react";
import { JobsController } from "controllers/jobs_controller";
import { RecordModalController } from "controllers/record_modal_controller";
import { RecordsController } from "controllers/records_controller";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { RecordFormModalView } from "./view";

export interface Props {}

export const RecordFormModalContainer = observer(({}: Props) => {
  const recordsController = useController(RecordsController, {});
  const modalController = useController(RecordModalController, {});
  const jobsController = useController(JobsController, {});

  const isOpen = modalController.modalState.enabled;
  const selectedJob = modalController.modalState.context?.selectedJob;

  useEffect(() => {
    if (isOpen) {
      recordsController.load();
      jobsController.load();
    }
  }, [selectedJob, isOpen, recordsController, jobsController]);

  if (recordsController.isLoading) {
    return null;
  }

  return (
    <RecordFormModalView
      key={selectedJob}
      isOpen={isOpen}
      isLoadingJobs={jobsController.state.isLoading}
      jobs={jobsController.data.items}
      data={modalController.modalState.context?.data}
      isCreating={recordsController.isCreating}
      onCreate={async (...args) => {
        await recordsController.create(...args);
        modalController.closeModal();
      }}
      onUpdate={async (...args) => {
        recordsController.update(...args);
        modalController.closeModal();
      }}
      onCancel={() => {
        modalController.closeModal();
      }}
      selectedJobId={jobsController.currentJobId}
    />
  );
});
