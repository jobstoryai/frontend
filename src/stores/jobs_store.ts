import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job, JobPayload } from "repositories/job_repository";

interface Options {
  appStore: AppStore;
}

interface State {
  isInitialized: boolean;
  isLoading: boolean;
  isCreating: boolean;
  jobs: Job[];
}

const getDefaultState = (): State => ({
  isInitialized: false,
  isLoading: false,
  isCreating: false,
  jobs: [],
});

export class JobsStore {
  private appStore: AppStore;
  public state = getDefaultState();

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  loadCacheIfNeeded = async () => {
    if (this.state.isInitialized) {
      return;
    }
    await this.load();
    runInAction(() => {
      this.state.isInitialized = true;
    });
  };

  load = async ({ silent = false } = {}) => {
    const { repos } = this.appStore;
    if (!silent) {
      this.state.isLoading = true;
    }

    const [jobs, _] = await repos.jobs.list(1, {
      queryParams: {
        page_size: 100,
      },
    });

    runInAction(() => {
      this.state.jobs = jobs;
      if (!silent) {
        this.state.isLoading = false;
      }
    });
  };

  create = async (payload: JobPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      this.state.isCreating = true;
      const job = await repos.jobs.create(payload);

      runInAction(async () => {
        this.state.jobs.unshift(job);
        toastStore.show("success", "Working Experience has been added");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
      throw new Error("Store Error");
    } finally {
      runInAction(() => {
        this.state.isCreating = false;
      });
    }
  };

  update = async (id: number, payload: JobPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      this.state.isCreating = true;
      const updatedJob = await repos.jobs.update(id, payload);

      runInAction(() => {
        const jobIndex = this.state.jobs.findIndex(
          (job) => job.id === updatedJob.id,
        );
        if (jobIndex !== -1) {
          this.state.jobs[jobIndex] = updatedJob;
        }
        toastStore.show("success", "Working Experience has been updated");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.state.isCreating = false;
      });
    }
  };

  delete = async (id: number) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      runInAction(() => {
        this.load({ silent: true });
        this.state.jobs = this.state.jobs.filter((job) => job.id !== id);
        toastStore.show("success", "Working Experience has been deleted");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
    }
  };

  incrementRecordsCount = async (id: number) => {
    if (!this.state.isInitialized) {
      return;
    }
    const idx = this.state.jobs.findIndex((job) => job.id === id);

    if (idx) {
      const job = this.state.jobs[idx];
      job.records = job.records + 1;
    }
  };

  decrementRecordsCount = async (id: number) => {
    if (!this.state.isInitialized) {
      return;
    }
    const idx = this.state.jobs.findIndex((job) => job.id === id);

    if (idx) {
      const job = this.state.jobs[idx];
      job.records = job.records - 1 <= 0 ? job.records - 1 : 0;
    }
  };
}
