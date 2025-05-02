import React from "react";
import { JobModalController } from "controllers/job_modal_controller";
import { JobsController } from "controllers/jobs_controller";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { JobFormModalView } from "./view";

export interface Props {}

export const JobFormModalContainer = observer(({}: Props) => {
  const modalController = useController(JobModalController, {});
  const jobsCotroller = useController(JobsController, {});
  const state = modalController.modalState;

  if (!state.enabled) {
    return null;
  }

  return (
    <JobFormModalView
      isOpen={state.enabled}
      data={state.context?.data || null}
      isCreating={false}
      onCancel={() => {
        modalController.closeModal();
      }}
      onUpdate={(id, payload) => {
        jobsCotroller.update(id, payload);
        modalController.closeModal();
      }}
      onCreate={(payload) => {
        jobsCotroller.create(payload);
        modalController.closeModal();
      }}
    />
  );
});
