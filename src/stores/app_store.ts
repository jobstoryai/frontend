import { getLogger } from "lib/logger";
import { makeAutoObservable } from "mobx";
import { AuthStore } from "./auth_store";
import { UserApiRepository } from "repositories/user_repository";
import { RecordsApiRepository } from "repositories/record_repository";
import { RecordsStore } from "./records_store";

const log = getLogger(["stores", "AppStore"]);

export class AppStore {
  authStore: AuthStore;
  /**
   * Repositories to CRUD data from API
   */
  repos: {
    users: UserApiRepository;
    records: RecordsApiRepository;
  };
  /**
   * Services to share store asnd manipulate data between containers
   */
  stores: {
    recordsStore: RecordsStore;
  };

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authStore = new AuthStore({ appStore: this });

    this.stores = {
      recordsStore: new RecordsStore({ appStore: this }),
    };

    this.repos = {
      users: new UserApiRepository(),
      records: new RecordsApiRepository(),
    };
  }
}
