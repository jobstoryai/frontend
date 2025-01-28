import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Router from "next/router";

import { useController } from "lib/useController";

import { UserFormView } from "./UserFormView";
import { UserFormController } from "./UserFormController";
import { Loader } from "components/Loader";

export interface Props {
  username: string;
}

export const UserFormContainer = observer(({ username }: Props) => {
  const instanceUserFormController = useController(UserFormController, {});

  useEffect(() => {
    instanceUserFormController.load(username);
  }, []);

  const isLoading =
    instanceUserFormController.isLoading ||
    (Boolean(username) && Boolean(!instanceUserFormController.data));

  if (isLoading || instanceUserFormController.data === null) {
    return <Loader />;
  }

  return (
    <UserFormView
      isLoading={instanceUserFormController.isLoading}
      isModifying={instanceUserFormController.isModifying}
      data={instanceUserFormController.data}
      onUpdate={async (id, values) => {
        const success = await instanceUserFormController.onUpdate(id, values);
        success && Router.replace(`/u/${username}/`);
      }}
      onSearch={instanceUserFormController.onSearch}
    />
  );
});
