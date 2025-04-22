import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Job, JobPayload } from "repositories/job_repository";

interface Options {
  appStore: AppStore;
}

export class WorkExperienceSettingsController {
  private appStore: AppStore;
  isLoading = true;
  isCreating = false;
  jobs: Job[] = [];

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load({ silent = false } = {}) {
    const { repos } = this.appStore;
    if (!silent) {
      this.isLoading = true;
    }

    const [jobs, _] = await repos.jobs.list();

    runInAction(() => {
      this.jobs = jobs;
      if (!silent) {
        this.isLoading = false;
      }
    });
  }

  create = async (payload: JobPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      this.isCreating = true;
      await repos.jobs.create(payload);

      runInAction(() => {
        this.load({ silent: true });
        toastStore.show("success", "Working Experience has been added");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
      throw new Error("Store Error");
    } finally {
      runInAction(() => {
        this.isCreating = false;
      });
    }
  };

  update = async (id: number, payload: JobPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      this.isCreating = true;
      await repos.jobs.update(id, payload);

      runInAction(() => {
        this.load({ silent: true });
        toastStore.show("success", "Working Experience has been updated");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isCreating = false;
      });
    }
  };

  delete = async (id: number) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;

    try {
      await repos.jobs.delete(id);

      runInAction(() => {
        this.load({ silent: true });
        toastStore.show("success", "Working Experience has been deleted");
      });
    } catch (e) {
      toastStore.show("error", "Something went wrong");
    }
  };
}
