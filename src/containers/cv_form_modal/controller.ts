import { makeAutoObservable, runInAction } from "mobx";
import router from "next/router";

import { AppStore } from "stores/app_store";
import { CvPayload } from "repositories/cv_repository";
import { Job } from "repositories/job_repository";

interface Options {
  appStore: AppStore;
}

export class CvFormModalController {
  private appStore: AppStore;
  isLoadingJobs = true;
  jobs: Job[] = [];

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    this.loadJobs();
  }
  async loadJobs() {
    const { repos } = this.appStore;
    const [jobs, _] = await repos.jobs.list();
    runInAction(() => {
      console.log(jobs);
      this.jobs = jobs;
      this.isLoadingJobs = false;
    });
  }

  create = async (payload: CvPayload) => {
    const {
      repos,
      stores: { toastStore, onboardingStore },
    } = this.appStore;

    try {
      const cv = await repos.cvs.create(payload);

      onboardingStore.load();
      runInAction(() => {
        toastStore.show("success", "Settings has been updated!");
        router.replace(`/cvs/${cv.id}`);
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    }
  };
}
