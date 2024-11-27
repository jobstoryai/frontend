import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { UserFormContainer } from "containers/UserForm";


const Page = observer(() => {
  const router = useRouter();
  const { user } = router.query;

  if (!user) {
    return null;
  }


  return <UserFormContainer username={String(user)} />;
});

export default Page;

