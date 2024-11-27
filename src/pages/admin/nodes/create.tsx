import React from "react";
import { observer } from "mobx-react-lite";
import { NodeFormContainer } from "containers/NodeForm";


const CreateNodeFormPage = observer(() => {
  return <NodeFormContainer />;
});

export default CreateNodeFormPage;
