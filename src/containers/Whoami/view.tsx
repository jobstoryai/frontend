import React, { FC } from "react";
import { observer } from "mobx-react-lite";
import { Loader } from "components/Loader";

interface Props {
  isLoading: boolean;
  data: any;
}

export const WhoamiView = observer(({ data, isLoading }: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
});
