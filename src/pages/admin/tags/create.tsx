import React from "react";
import { observer } from "mobx-react-lite";
import { NodeTagFormContainer } from "containers/NodeTagForm";


const Page = observer(() => {
  return <NodeTagFormContainer />;
});

export default Page;


