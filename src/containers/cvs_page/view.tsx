import React, { FC, ReactElement, ReactNode } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, List, Row, Typography } from "antd";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";

import { Cv } from "repositories/cv_repository";

import { MayBeAsync, Paginated } from "types";

import { CvListItem } from "./components/cv_list_item";

interface Props {
  isLoading: boolean;
  data: Paginated<Cv>;
  onDelete: (id: number) => MayBeAsync<void>;
  onEdit: (id: number) => MayBeAsync<void>;
  onDeactivate: (id: number) => MayBeAsync<void>;
  onCreate: () => MayBeAsync<void>;
}
export const CvsPageView = observer(
  ({ data, isLoading, onCreate, onEdit, onDeactivate, onDelete }: Props) => (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          maxWidth: 800,
          width: "100%",
        }}
      >
        <Card
          title="CVs"
          extra={[
            <Button key="create" type="text" color="primary" onClick={onCreate}>
              <PlusOutlined /> Create
            </Button>,
          ]}
          style={{ minWidth: "100%" }}
        >
          {data.items.length ? (
            <List loading={isLoading}>
              {data.items.map((item) => (
                <CvListItem
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onDeactivate={onDeactivate}
                  onDelete={onDelete}
                />
              ))}
            </List>
          ) : (
            <Row style={{ justifyContent: "center", padding: "40px 0" }}>
              <Typography.Text type="secondary">
                You don&apos;t have CVs yet.{" "}
              </Typography.Text>
            </Row>
          )}
        </Card>
      </div>
    </div>
  ),
);
