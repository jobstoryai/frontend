import React from "react";
import { observer } from "mobx-react-lite";

import { RecordCard } from "components/record_card";
import { Record } from "repositories/record_repository";

import { MayBeAsync } from "types";

interface Props {
  isLoading: boolean;
  records: Record[];
  onDelete: (id: number) => MayBeAsync<void>;
}

export const RecordsListView = observer(({ records, onDelete }: Props) => {
  return (
    <>
      {records.map((record) => (
        <RecordCard key={record.id} record={record} onDelete={onDelete} />
      ))}
    </>
  );
});
