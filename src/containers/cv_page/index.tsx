import React, { useEffect } from "react";
import { CvVersionController } from "controllers/cv_version_controller";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { CvPageView } from "./view";

export interface Props {
  cvId: number;
}

export const CvPageContainer = observer(({ cvId }: Props) => {
  const cvVersionController = useController(CvVersionController)

  useEffect(() => {
    if (!!cvId) {
      cvVersionController.load(cvId);
    }
  }, [cvVersionController, cvId]);

  if (cvId && cvVersionController.isLoading) {
    return <Loader />;
  }

  return (
    <CvPageView
      onUpdate={cvVersionController.create}
      isUpdating={cvVersionController.isCreatingVersion}
      cvId={cvId}
      cv={cvVersionController.data!}
      latestVersion={cvVersionController.latestVersion}
    />
  );
});
