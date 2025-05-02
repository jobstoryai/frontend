import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, List, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";

import { CvFormModalContainer } from "containers/cv_form_modal";
import { Cv } from "repositories/cv_repository";

import { MayBeAsync, Paginated } from "types";

import { CvListItem } from "./components/cv_list_item";

interface Props {
  isLoading: boolean;
  data: Paginated<Cv>;
  onDelete: (id: number) => MayBeAsync<void>;
  onEdit: (id: number) => MayBeAsync<void>;
  onCreate: () => MayBeAsync<void>;
}

export const CvsPageView = observer(
  ({ data, isLoading, onCreate, onEdit, onDelete }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
      <>
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
              title="Your Resumes"
              extra={[
                <Button
                  key="create"
                  type="text"
                  color="primary"
                  onClick={() => setIsModalOpen(true)}
                >
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
                      onDelete={onDelete}
                    />
                  ))}
                </List>
              ) : (
                <Empty
                  styles={{ image: { height: 60 } }}
                  style={{ margin: "40px 0 60px" }}
                  description={
                    <Typography.Text type="secondary">
                      You don’t have any resumes yet.
                    </Typography.Text>
                  }
                >
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Create a Resume
                  </Button>
                </Empty>
              )}
            </Card>
          </div>
        </div>
        <CvFormModalContainer
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  },
);
