import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { UserPageContainer } from "containers/UserPage";


const Page = observer(() => {
  const router = useRouter();
  const { user } = router.query;

  if (!user) {
    return null;
  }


  return <UserPageContainer username={String(user)} />;
});

export default Page;
