import { PlusOutlined } from "@ant-design/icons";
import { Affix, Button, Empty, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useWindowSize } from "usehooks-ts";

import { Record, RecordPayloadAnyJob } from "repositories/record_repository";

import { MayBeAsync, Paginated } from "types";

import { RecordCard } from "./components/record_card";

interface Props {
  isLoadingNextPage: boolean;
  onOpenRecordModal: (args?: { data: Record }) => void;
  data: Paginated<Record>;

  onUpdate: (id: number, payload: RecordPayloadAnyJob) => MayBeAsync<void>;
  onDelete: (id: number) => MayBeAsync<void>;
}

export const RecordsPageView = observer(
  ({ data, onOpenRecordModal, onDelete }: Props) => {
    const window = useWindowSize();
    const isMobile = window.width <= 575;
    console.log("is_mobile", isMobile);

    return (
      <>
        <Row
          style={{ width: "100%", marginBottom: 16, marginRight: 0 }}
          justify="end"
        >
          {!isMobile && (
            <Affix offsetTop={20}>
              <Button
                type="primary"
                onClick={() => {
                  onOpenRecordModal();
                }}
              >
                Add Record
              </Button>
            </Affix>
          )}
          {isMobile && (
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              style={{
                fontSize: 24,
                position: "fixed",
                bottom: 32,
                right: 32,
                zIndex: 100,
                width: 64,
                height: 64,
                marginRight: 0,
                boxShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              }}
              type="primary"
              onClick={() => {
                onOpenRecordModal();
              }}
            />
          )}
        </Row>
        {data.items.length ? (
          data.items.map((record) => (
            <RecordCard
              key={record.id}
              record={record}
              onDelete={onDelete}
              onEdit={() => {
                onOpenRecordModal({ data: record });
              }}
            />
          ))
        ) : (
          <Empty
            styles={{ image: { height: 60 } }}
            style={{ margin: "40px 0 60px" }}
            description={
              <Typography.Text type="secondary">
                You don&apos;t have any records yet. Try to add one
              </Typography.Text>
            }
          >
            <Button
              type="primary"
              onClick={() => {
                onOpenRecordModal();
              }}
            >
              Add Record
            </Button>
          </Empty>
        )}
      </>
    );
  },
);
