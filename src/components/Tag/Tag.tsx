import React from "react";
import { Tag as AntdTag } from "antd";

interface TagItem {
  name: string;
  color: string;
}

interface Props {
  item: TagItem
}

export const Tag = ({ item }: Props) => (
  <AntdTag color={item.color} style={{ marginBottom: 4 }}>
    {item.name}
  </AntdTag>
);
