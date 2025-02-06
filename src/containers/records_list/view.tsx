import React from "react";
import { observer } from "mobx-react-lite";

import { RecordCard } from "components/record_card";
import { Record } from "repositories/record_repository";

interface Props {
  isLoading: boolean;
  records: Record[];
}

export const RecordsListView = observer(({ records }: Props) => {
  return (
    <>
      {records.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </>
  );
});
