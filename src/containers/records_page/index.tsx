import React from "react";
import { observer } from "mobx-react-lite";

import { RecordsListContainer } from "containers/records_list";
import { RecordFormContainer } from "containers/record_form";

export interface Props {}

export const RecordsPageContainer = observer(({}: Props) => {
  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
        }}
      >
        <RecordFormContainer />
        <RecordsListContainer />
      </div>
    </div>
  );
});
