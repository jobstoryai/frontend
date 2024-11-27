import React from "react";
import type { DataNode, TreeProps } from 'antd/es/tree';
import { Tree } from "antd/lib";
import { BookOutlined, BulbOutlined, DownOutlined, ExperimentOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import { Loader } from "components/Loader";
import { toJS } from "mobx";
import Link from "next/link";

interface Props {
  tree: DataNode;
}

function unwrapTree(tree: any) {
  return tree.map((i: any) => ({
    title: () => (
    <Link href={`/admin/nodes/${i.id}`}>{i.title}</Link>
    ),
    icon: (() => {
      if (i.node_type === 'SKILL') {
        return <ExperimentOutlined />
      }

      if (i.node_type === 'CONCEPT') {
        return <BookOutlined />
      }

      if (i.node_type === 'COMPETENCE') {
        return <BulbOutlined />
      }
    })(),
    key: i.slug,
    children: unwrapTree(i.children)
  }))
}

export const NodeTreeView = observer(({ tree }: Props) => {
  if (!tree) {
    return <Loader />
  }


  return (
    <Tree
      showLine
      switcherIcon={<DownOutlined />}
      defaultExpandedKeys={['0-0-0']}
      treeData={unwrapTree([tree]) as any}
    />
  );
})
