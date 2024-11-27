import React from "react";
import { observer } from "mobx-react-lite";
import { NodeTagFormContainer } from "containers/NodeTagForm";
import { useRouter } from "next/router";


const Page = observer(() => {
  const router = useRouter();
  const { tagId } = router.query;

  if (!tagId) {
    return null;
  }

  return <NodeTagFormContainer id={Number(tagId)} />;
});

export default Page;



