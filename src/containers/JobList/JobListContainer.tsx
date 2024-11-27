import React, { useEffect } from "react";
import { JobListView } from "./JobListView";
import { useController } from "lib/useController";
import { JobListController } from "./JobListController";
import { observer } from "mobx-react-lite";

export interface Props {}

export const JobListContainer = observer(({}: Props) => {
  const jobListController = useController(JobListController, {});

  useEffect(() => {
    jobListController.load(1);
  }, []);

  return (
    <JobListView
      isLoading={jobListController.isLoading}
      dataPage={jobListController.data}
      onPageChange={(page) => jobListController.load(page)}
      onPageSizeChange={(size) => jobListController.setPageSize(size)}
      onDelete={(id) => jobListController.onDelete(id)}
      onSearch={(q) => jobListController.setQuery(q)}
      onSetOrdering={(o) => {
        o
          ? jobListController.setOrdering(o)
          : jobListController.resetOrdering()
        }
      }
      onSetFiltering={(f) => jobListController.setFilters(f)}
    />
  );
});
