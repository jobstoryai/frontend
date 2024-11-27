import { getLogger } from "lib/logger";
import { makeAutoObservable } from "mobx";
import { AuthStore } from "./auth_store";

const log = getLogger(["stores", "AppStore"]);

export class AppStore {
  authStore: AuthStore;
  repos: {};

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authStore = new AuthStore({ appStore: this });

    this.repos = {};
  }
}
