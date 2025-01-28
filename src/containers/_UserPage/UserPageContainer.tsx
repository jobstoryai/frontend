import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";
import { Loader } from "components/Loader";

import { UserPageView } from "./UserPageView";
import { UserPageController } from "./UserPageController";

export interface Props {
  username: string | null;
}

export const UserPageContainer = observer(({ username }: Props) => {
  const userPageController = useController(UserPageController, {});

  useEffect(() => {
    userPageController.load(username);
  }, []);

  const isLoading =
    userPageController.isLoading ||
    (Boolean(username) && Boolean(!userPageController.data));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <UserPageView 
      isEditable={userPageController.isEditable}
      data={userPageController.data}
    />
  );
})
