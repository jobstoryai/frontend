import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job, JobPayload } from "repositories/job_repository";

interface Options {
  appStore: AppStore;
}

export class JobsController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get data() {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.data;
  }

  get state() {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.state;
  }

  load = async () => {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.loadCacheIfNeeded();
  };

  create = async (payload: JobPayload) => {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.create(payload);
  };

  update = async (id: number, payload: JobPayload) => {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.update(id, payload);
  };

  delete = async (id: number) => {
    const { jobsStore } = this.appStore.stores;
    return jobsStore.delete(id);
  };

  get currentJobId() {
    const jobs = this.data.items;
    let currentJob = jobs.find((job) => !job.finished);

    if (!currentJob) {
      currentJob = jobs.reduce(
        (bestMatch, job) => {
          return !bestMatch ||
            new Date(job.started) > new Date(bestMatch.started)
            ? job
            : bestMatch;
        },
        null as Job | null,
      )!;
    }

    return currentJob?.id || null;
  }
}
