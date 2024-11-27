import React from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { NodeFormPageContainer } from "containers/NodeFormPage";


const NodeFormPage = observer(() => {
  const router = useRouter();
  const { nodeId } = router.query;

  if (!nodeId) {
    return null;
  }

  return <NodeFormPageContainer id={Number(nodeId)} />;
});

export default NodeFormPage;
