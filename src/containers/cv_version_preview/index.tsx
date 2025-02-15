import React, { useEffect } from "react";
import { AuthController } from "controllers/auth_controller";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { CvVersionPreviewController } from "./controller";
import { CvVersionPreviewView } from "./view";

export interface Props {
  versionId: string;
}

export const CvVersionPreviewContainer = observer(({ versionId }: Props) => {
  const controller = useController(CvVersionPreviewController, {});
  const userController = useController(AuthController, {});

  useEffect(() => {
    controller.load(versionId);
  }, [controller, versionId]);

  if (controller.isLoading || userController.isLoading || !controller.data) {
    return <Loader />;
  }

  return (
    <CvVersionPreviewView
      isLoading={controller.isLoading}
      user={userController.user}
      data={controller.data}
    />
  );
});
