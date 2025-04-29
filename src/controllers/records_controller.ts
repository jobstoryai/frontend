import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job } from "repositories/job_repository";
import { RecordPayloadAnyJob } from "repositories/record_repository";

interface Options {
  appStore: AppStore;
}

export class RecordsController {
  private appStore: AppStore;
  isLoadingJobs = true;
  jobs: Job[] = [];
  currentJob: Job | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.loadCacheIfNeeded();
  }

  get isLoading() {
    const { recordsStore } = this.appStore.stores;
    return !recordsStore.state.isInitialized || recordsStore.state.isLoading;
  }

  get isCreating() {
    const { recordsStore } = this.appStore.stores;
    return recordsStore.state.isCreating;
  }

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
