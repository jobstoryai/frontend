import { makeAutoObservable } from "mobx";

import { AppStore } from "stores/AppStore";


interface Opts {
  appStore: AppStore;
}

export class WhoamiController {
  private appStore: AppStore;

  constructor({ appStore }: Opts) {
    this.appStore = appStore;
    makeAutoObservable(this);
  }

  get me() {
    const { authStore } = this.appStore;
    return authStore.me;
  }
}
