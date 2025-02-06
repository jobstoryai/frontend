import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";

import { useController } from "lib/use_controller";

import { CvsPageController } from "./controller";
import { CvsPageView } from "./view";

export interface Props {}

export const CvsPageContainer = observer(({}: Props) => {
  const controller = useController(CvsPageController, {});
  const router = useRouter();

  useEffect(() => {
    controller.load(1);
  }, [controller]);

  return (
    <CvsPageView
      isLoading={controller.isLoading}
      data={controller.data}
      onDelete={controller.delete}
      onCreate={() => {
        router.push(`/cvs/new`);
      }}
      onEdit={(id: number) => {
        router.push(`/cvs/${id}`);
      }}
      onDeactivate={() => {}}
    />
  );
});
