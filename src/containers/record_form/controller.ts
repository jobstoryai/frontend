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
    const { repos } = this.appStore;
    this.isLoadingJobs = true;
    const [jobs, _] = await repos.jobs.list();

    runInAction(() => {
      this.jobs = jobs;
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
