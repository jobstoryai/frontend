import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class OnboardingProgressController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  load = async () => {
    const { onboardingStore } = this.appStore.stores;
    await onboardingStore.load();
  };

  disable = () => {
    const { onboardingStore } = this.appStore.stores;
    onboardingStore.disable();
  };

  get isCompleted() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.isCompleted();
  }

  get isReady() {
    return this.appStore.stores.onboardingStore.isReady;
  }

  get state() {
    return this.appStore.stores.onboardingStore.state;
  }
}
