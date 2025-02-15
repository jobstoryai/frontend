import React from "react";
import { observer } from "mobx-react-lite";

import { RecordFormContainer } from "containers/record_form";
import { RecordsListContainer } from "containers/records_list";

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
          width: "100%",
          maxWidth: 800,
        }}
      >
        <RecordFormContainer />
        <RecordsListContainer />
      </div>
    </div>
  );
});
