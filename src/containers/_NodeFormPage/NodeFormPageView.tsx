import React from "react";
import { Tabs, TabsProps } from "antd";
import { NodeFormContainer } from "containers/NodeForm/NodeFormContainer";
import { NodeTreeContainer } from "containers/NodeTree";


interface Props {
  id: number;
}


export const NodeFormPageView = ({ id }: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "form",
      label: "Edit",
      children: <NodeFormContainer id={id} />,
    },
    {
      key: "tree",
      label: "Tree",
      children: <NodeTreeContainer id={id} />,
    },
  ];

  return <Tabs defaultActiveKey="form" items={items} />;
};
