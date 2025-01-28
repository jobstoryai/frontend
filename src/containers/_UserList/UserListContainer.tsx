import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { useController } from "lib/useController";

import { UserListController } from "./UserListController";
import { UserListView } from "./UserListView";

export const UserListContainer = observer(() => {
  const usersListController = useController(UserListController, {});

  useEffect(() => {
    usersListController.load(1);
  }, []);

  return (
    <UserListView
      isLoading={usersListController.isLoading}
      dataPage={usersListController.data}
      onPageChange={usersListController.load}
    />
  );
});
