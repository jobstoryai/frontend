import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/use_controller";

import { CvFormModalController } from "./controller";
import { CvFormModalView } from "./view";

export interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

export const CvFormModalContainer = observer(
  ({ isOpen = false, onClose }: Props) => {
    const controller = useController(CvFormModalController, {});

    useEffect(() => {
      controller.load();
    }, [controller]);

    return (
      <CvFormModalView
        isOpen={isOpen}
        onCancel={onClose}
        onSubmit={controller.create}
        isLoadingJobs={controller.isLoadingJobs}
        jobs={controller.jobs}
      />
    );
  },
);
