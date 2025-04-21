import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Affix, Button, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useWindowSize } from "usehooks-ts";

import { Job } from "repositories/job_repository";
import {
  Record,
  RecordPayload,
  RecordPayloadAnyJob,
} from "repositories/record_repository";

import { MayBeAsync, Paginated } from "types";

import { RecordFormModal } from "./components/form";
import { RecordCard } from "./components/record_card";

interface Props {
  isCreating: boolean;
  isLoadingNextPage: boolean;
  isLoadingJobs: boolean;

  data: Paginated<Record>;
  jobs: Job[];

  onCreate: (payload: RecordPayloadAnyJob) => MayBeAsync<void>;
  onUpdate: (id: number, payload: RecordPayloadAnyJob) => MayBeAsync<void>;
  onDelete: (id: number) => MayBeAsync<void>;
}

export const RecordsPageView = observer(
  ({
    isLoadingNextPage,
    data,
    jobs,
    isLoadingJobs,
    isCreating,
    onCreate,
    onUpdate,
    onDelete,
  }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState<Record | null>(null);
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
                  setModalData(null);
                  setIsModalOpen(true);
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
                setModalData(null);
                setIsModalOpen(true);
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
                setModalData(record);
                setIsModalOpen(true);
              }}
            />
          ))
        ) : (
          <Typography.Paragraph
            style={{
              fontSize: 16,
              color: "#888",
              padding: "80px 0",
            }}
          >
            You don&apos;t have any records yet. Try to add one
          </Typography.Paragraph>
        )}
        <RecordFormModal
          isOpen={isModalOpen}
          data={modalData}
          jobs={jobs}
          isLoadingJobs={isLoadingJobs}
          isCreating={isCreating}
          onCreate={async (payload) => {
            try {
              await onCreate(payload);
              setIsModalOpen(false);
            } catch (e) {
              console.error(e);
            }
          }}
          onUpdate={async (id, payload) => {
            try {
              await onUpdate(id, payload);
              setIsModalOpen(false);
            } catch (e) {
              console.error(e);
            }
          }}
          onCancel={() => {
            setIsModalOpen(false);
          }}
        />
      </>
    );
  },
);
