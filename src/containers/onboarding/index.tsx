import React, { useEffect, useState } from "react";
import { CvsController } from "controllers/cvs_controller";
import { JobModalController } from "controllers/job_modal_controller";
import { RecordModalController } from "controllers/record_modal_controller";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { useController } from "lib/use_controller";

import { OnboardingController } from "./controller";
import { OnboardingView } from "./view";

export interface Props {}

export const OnboardingContainer = observer(({}: Props) => {
  const controller = useController(OnboardingController);
  const jobModalController = useController(JobModalController);
  const recordModalController = useController(RecordModalController);
  const [isFirstCvModalShown, setIsFirstCvModalShown] = useState(false);
  const cvsController = useController(CvsController);
  const router = useRouter();

  useEffect(() => {
    controller.load();
  }, [controller]);

  useEffect(() => {
    if (!controller.isReady || controller.isCompleted) {
      return;
    }

    const jobs = controller.state.jobs;
    const records = controller.state.records;
    const cvs = controller.state.cvs;
    const versions = controller.state.cv_versions;

    if (!jobs && !controller.isOnboardingFinished) {
      controller.openModal("onboarding");
      return;
    }

    if (!jobs) {
      controller.openModal("add-first-job");
      return;
    }
    if (jobs >= 1 && records < 1) {
      controller.openModal("add-first-record");
      return;
    }
    if (jobs >= 1 && records === 1) {
      controller.openModal("add-second-record");
      return;
    }
    if (jobs >= 1 && records === 2) {
      controller.openModal("add-third-record");
      return;
    }

    if (jobs >= 1 && records >= 3 && cvs === 0 && !isFirstCvModalShown) {
      controller.openModal("add-first-cv");
      return;
    }

    if (jobs >= 1 && records >= 3 && cvs >= 1 && versions === 0) {
      controller.openModal("add-first-preview");
      return;
    }

    if (jobs >= 1 && records >= 3 && cvs >= 1 && versions === 1) {
      controller.openModal("onboarding-finished");
      return;
    }

    if (jobs >= 1 && records >= 3 && cvs >= 1 && versions >= 1) {
      controller.setCompleted(true);
    }
  }, [
    controller.state.jobs,
    controller.state.records,
    controller.state.cv_versions,
    controller.state.cvs,
    controller.isOnboardingFinished,
    isFirstCvModalShown,
    controller.isCompleted,
    controller.isReady,
    controller,
  ]);

  return (
    <OnboardingView
      modal={controller.modal}
      onOpenCvPage={() => {
        controller.closeAllModals();
        setIsFirstCvModalShown(true);
        router.push("/cvs");
      }}
      onOpenCvPreview={async () => {
        await cvsController.reload();
        controller.closeAllModals();
        controller.setIsFirstCvModalShown(true);

        const cvs = cvsController.data.items;
        if (!cvs.length) {
          router.push(`/cvs/`);
        } else {
          router.push(`/cvs/${cvs[0].id}`);
        }
      }}
      onOpenJobModal={() => {
        controller.closeAllModals();
        jobModalController.openModal();
      }}
      onOpenRecordModal={() => {
        controller.closeAllModals();
        recordModalController.openModal();
      }}
      onFinishOnboarding={() => {
        controller.setIsOnboardingFinished(true);
        router.replace("/jobs");
      }}
      onFinallyFinishOnboarding={() => {
        controller.closeAllModals();
        controller.setCompleted(true);
      }}
    />
  );
});
