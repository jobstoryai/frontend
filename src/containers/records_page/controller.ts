import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job } from "repositories/job_repository";
import { RecordPayloadAnyJob } from "repositories/record_repository";

interface Options {
  appStore: AppStore;
}

export class RecordsPageController {
  private appStore: AppStore;
  isLoadingJobs = true;
  jobs: Job[] = [];

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.loadCacheIfNeeded();
    await this.loadJobs();
  }

  get isLoading() {
    const { recordsStore } = this.appStore.stores;
    return !recordsStore.state.isInitialized || recordsStore.state.isLoading;
  }

  get isCreating() {
    const { recordsStore } = this.appStore.stores;
    return recordsStore.state.isCreating;
  }

  loadJobs = async () => {
    const { repos } = this.appStore;
    this.isLoadingJobs = true;
    const [jobs, _] = await repos.jobs.list();

    runInAction(() => {
      this.jobs = jobs;
      this.isLoadingJobs = false;
    });
  };

  get data() {
    const { recordsStore } = this.appStore.stores;
    return recordsStore.data;
  }

  async loadNextPage() {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.loadNextPage();
  }

  delete = async (id: number) => {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.delete(id);
  };

  create = async (payload: RecordPayloadAnyJob) => {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.create(payload);
  };

  update = async (id: number, payload: RecordPayloadAnyJob) => {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.update(id, payload);
  };
}
