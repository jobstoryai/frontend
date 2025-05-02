import { makeAutoObservable } from "mobx";

import { AppStore } from "stores/app_store";
import { OnboardingModalName } from "stores/onboarding_store";
import { getLogger } from "lib/logger";

const log = getLogger(["controllers", "onboarding"]);

interface Options {
  appStore: AppStore;
}

export class OnboardingController {
  private appStore: AppStore;
  isOnboardingFinished: boolean = false;
  isFirstCvModalShown: boolean = false;

  constructor({ appStore }: Options) {
    this.appStore = appStore;
    makeAutoObservable(this);

    const isOnboardingFinished = localStorage.getItem("isOnboardingFinished");
    this.isOnboardingFinished = isOnboardingFinished === "true";

    const isFirstCvModalShown = localStorage.getItem("isFirstCvModalShown");
    this.isFirstCvModalShown = isFirstCvModalShown === "true";
  }

  setIsOnboardingFinished = (value: boolean) => {
    localStorage.setItem("isFirstCvModalShown", String(value));
    this.isOnboardingFinished = value;
  };

  setIsFirstCvModalShown = (value: boolean) => {
    localStorage.setItem("isOnboardingFinished", String(value));
    this.isFirstCvModalShown = value;
  };

  get load() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.load;


  }

  get modal() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.modal;
  }

  get state() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.state;
  }

  get isReady() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.isReady;
  }

  setCompleted = (v: boolean) => {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.setCompleted(v);
  }

  get isCompleted() {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.isCompleted();
  }

  openModal = (key: OnboardingModalName) => {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    log(`Open modal ${key}`);
    return onboardingStore.openModal(key);
  };

  closeAllModals = () => {
    const {
      stores: { onboardingStore },
    } = this.appStore;
    return onboardingStore.closeAllModals();
  };
}
