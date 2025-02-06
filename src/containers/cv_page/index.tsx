import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { CvPageController } from "./controller";
import { CvPageView } from "./view";

export interface Props {
  cvId?: number;
}

export const CvPageContainer = observer(({ cvId }: Props) => {
  const controller = useController(CvPageController, {});

  useEffect(() => {
    if (!!cvId) {
      controller.load(cvId);
    }
  }, [controller, cvId]);

  if (cvId && (controller.isLoading || !controller.data)) {
    return <Loader />;
  }

  return (
    <CvPageView
      isUpdating={controller.isUpdating}
      onSubmit={(payload) => {
        !!cvId ? controller.update(cvId, payload) : controller.create(payload);
      }}
      onDelete={() => {
        cvId && controller.delete(cvId);
      }}
      isNew={!cvId}
      data={controller.data}
    />
  );
});
