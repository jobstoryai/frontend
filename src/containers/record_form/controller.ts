import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job } from "repositories/job_repository";
import { RecordPayload } from "repositories/record_repository";

interface Options {
  appStore: AppStore;
}

export class RecordFormController {
  private appStore: AppStore;
  isLoadingJobs = true;
  jobs: Job[] = [];

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  load = async () => {
    await this.loadJobs();
  };

  loadJobs = async () => {
    const { jobsStore } = this.appStore.stores;
    this.isLoadingJobs = true;
    await jobsStore.loadCacheIfNeeded();

    runInAction(() => {
      this.jobs = jobsStore.data.items;
      let currentJob = this.jobs.find((job) => !job.finished);

      if (!currentJob) {
        currentJob = this.jobs.reduce(
          (latest, job) => {
            return !latest || new Date(job.started) > new Date(latest.started)
              ? job
              : latest;
          },
          null as Job | null,
        )!;
      }

      this.isLoadingJobs = false;
    });
  };

  get isCreating() {
    const { recordsStore } = this.appStore.stores;
    return recordsStore.state.isCreating;
  }

  create = async (payload: RecordPayload) => {
    const { recordsStore } = this.appStore.stores;
    recordsStore.create(payload);
  };
}
