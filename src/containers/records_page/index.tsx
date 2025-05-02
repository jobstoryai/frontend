import React, { useEffect } from "react";
import { RecordModalController } from "controllers/record_modal_controller";
import { RecordsController } from "controllers/records_controller";
import { observer } from "mobx-react-lite";

import { Loader } from "components/Loader";
import { PageWrapper } from "components/page_wrapper";
import { useController } from "lib/use_controller";

import { RecordsPageView } from "./view";

export interface Props {}

export const RecordsPageContainer = observer(({}: Props) => {
  const recordModalController = useController(RecordModalController)
  const controller = useController(RecordsController);

  useEffect(() => {
    controller.load();
  }, [controller]);

  if (controller.isLoading) {
    return <Loader />;
  }

  return (
    <PageWrapper>
      <RecordsPageView
        isLoadingNextPage={false}
        onOpenRecordModal={recordModalController.openModal}
        data={controller.data}
        onUpdate={controller.update}
        onDelete={controller.delete}
      />
    </PageWrapper>
  );
});
