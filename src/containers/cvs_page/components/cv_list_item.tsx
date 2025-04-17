import React, { FC } from "react";
import {
    CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  EllipsisOutlined,
  PauseCircleOutlined,
  PauseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, List, Space } from "antd";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { Cv } from "repositories/cv_repository";

import { MayBeAsync } from "types";

import s from "./cv_list_item.module.css";

interface Props {
  item: Cv;
  onEdit: (id: number) => MayBeAsync<void>;
  onDeactivate: (id: number) => MayBeAsync<void>;
  onDelete: (id: number) => MayBeAsync<void>;
}

export const CvListItem = ({ item, onEdit, onDeactivate, onDelete }: Props) => {
  const router = useRouter();

  const goToCvPage = () => {
    router.push(`/cvs/${item.id}`);
  };

  return (
    <List.Item
      key={item.id}
      className={s.item}
      actions={[
        <Dropdown
          key="Dropdown"
          className={s.dropdown}
          menu={{
            items: [
              {
                label: "Edit",
                key: "edit",
                icon: <EditOutlined />,
                onClick: () => onEdit(item.id),
              },
              {
                label: "Deactivate",
                key: "Deactivate",
                icon: <PauseOutlined />,
                onClick: () => onDeactivate(item.id),
              },
              { type: "divider" },
              {
                label: "Delete",
                key: "delete",
                style: { color: "red" },
                icon: <DeleteOutlined />,
                onClick: () => onDelete(item.id),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Space>
            <EllipsisOutlined style={{ color: "#555" }} />
          </Space>
        </Dropdown>,
      ]}
    >
      <List.Item.Meta
        avatar={<CheckCircleFilled />}
        className={s.item_inner}
        onClick={goToCvPage}
        title={item.title}
        description={format(item.created_at, "yyyy-MM-dd HH:mm")}
      />
    </List.Item>
  );
};
