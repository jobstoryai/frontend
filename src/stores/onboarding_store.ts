import { makeAutoObservable, runInAction } from "mobx";

import { getLogger } from "lib/logger";

import { AppStore } from "./app_store";

const log = getLogger(["stores", "OnboardingStore"]);

const getDefaultState = () => ({
  records: 0,
  cvs: 0,
  jobs: 0,
  cv_versions: 0,
});

export type OnboardingModalName =
  | "onboarding"
  | "add-first-job"
  | "add-first-record"
  | "add-second-record"
  | "add-third-record"
  | "add-first-cv"
  | "add-first-preview"
  | "onboarding-finished";

export class OnboardingStore {
  private appStore: AppStore;

  public isReady = false;
  public isDisabled = false;
  public state = getDefaultState();
  public modal: OnboardingModalName | null = null;

  constructor({ appStore }: { appStore: AppStore }) {
    this.appStore = appStore;
    makeAutoObservable(this);
  }

  isCompleted = () => {
    const val = localStorage.getItem("onboarding")
    return val === "true" ? true : false
  }

  setCompleted = (val: boolean) => {
    localStorage.setItem("onboarding", String(val))
  }

  load = async () => {
    const { repos } = this.appStore;
    const { onboarding } = repos;

    if (this.isCompleted()) {
      log("Onboarding is completed")
      return

    }

    const data = await onboarding.get("me" as any);

    runInAction(() => {
      this.state = data;
      log("Fetched onboarding data: %o", this.state);
      this.isReady = true;
    });
  };

  openModal = (key: OnboardingModalName) => {
    log(`Open onboarding "${key}" modal`);
    this.modal = key;
  };

  closeAllModals = () => {
    this.modal = null;
  };

  disable = async () => {
    this.state = getDefaultState();
    this.isReady = false;
  };
}
