import React from "react";
import { observer } from "mobx-react-lite";
import { PublicUser } from "repositories/user_repository";
import { RecordCard } from "components/RecordCard";
import { Record } from "repositories/record_repository";

interface Props {
  isLoading: boolean;
  user: PublicUser;
  records: Record[];
}

export const RecordsListView = observer(({ user, records }: Props) => {
  return (
    <>
      {records.map((record) => (
        <RecordCard record={record} />
      ))}
    </>
  );
});
