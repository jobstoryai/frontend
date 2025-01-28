import { getLogger } from "lib/logger";
import { makeAutoObservable } from "mobx";
import { AuthStore } from "./auth_store";
import { UserApiRepository } from "repositories/user_repository";

const log = getLogger(["stores", "AppStore"]);

export class AppStore {
  authStore: AuthStore;
  repos: {
    users: UserApiRepository;
  };

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authStore = new AuthStore({ appStore: this });

    this.repos = {
      users: new UserApiRepository(),
    };
  }
}
