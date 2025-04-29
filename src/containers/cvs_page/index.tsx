import React, { useEffect } from "react";
import { CvsController } from "controllers/cvs_controller";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { Loader } from "components/Loader";
import { useController } from "lib/use_controller";

import { CvsPageView } from "./view";

export interface Props {}

export const CvsPageContainer = observer(({}: Props) => {
  const cvsController = useController(CvsController);
  const router = useRouter();

  useEffect(() => {
    cvsController.load();
  }, [cvsController]);

  if (cvsController.isLoading) {
    return <Loader />;
  }

  return (
    <CvsPageView
      isLoading={cvsController.isLoading}
      data={cvsController.data}
      onDelete={cvsController.delete}
      onCreate={() => {
        // TODO: CVS modal
      }}
      onEdit={(id: number) => {
        router.push(`/cvs/${id}`);
      }}
    />
  );
});
