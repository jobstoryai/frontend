import React, { FC } from "react";
import { observer } from "mobx-react-lite";

// TODO: Add view props here
interface Props {
  isLoading: boolean;
  data: any; // TODO:
}

export const RecordsPageView = observer(({ data }: Props) => (
  <div>
      <pre>{data}</pre>
  </div>
));
