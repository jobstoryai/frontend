import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { PageWrapper } from "components/page_wrapper";
import { useController } from "lib/use_controller";

import { RecordsPageController } from "./controller";
import { RecordsPageView } from "./view";

export interface Props {}

export const RecordsPageContainer = observer(({}: Props) => {
  const controller = useController(RecordsPageController, {});

  useEffect(() => {
    controller.load();
    controller.loadJobs();
  }, [controller]);

  if (controller.isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <RecordsPageView
        isLoadingNextPage={false}
        isLoadingJobs={controller.isLoadingJobs}
        jobs={controller.jobs}
        data={controller.data}
        isCreating={controller.isCreating}
        onCreate={controller.create}
        onUpdate={controller.update}
        onDelete={controller.delete}
      />
    </PageWrapper>
  );
});
