import { useState } from "react";
import { Affix, Button, Row, Typography } from "antd";
import { observer } from "mobx-react-lite";

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

    return (
      <>
        <Row
          style={{ width: "100%", marginBottom: 16, marginRight: 32 }}
          justify="end"
        >
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
