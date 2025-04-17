import { makeAutoObservable } from "mobx";

import { getLogger } from "lib/logger";
import { CvsApiRepository } from "repositories/cv_repository";
import { CvVersionApiRepository } from "repositories/cv_version_repsitory";
import { JobsApiRepository } from "repositories/job_repository";
import { RecordsApiRepository } from "repositories/record_repository";
import { UserApiRepository } from "repositories/user_repository";
import { UserSettingsApiRepository } from "repositories/user_settings";

import { AuthStore } from "./auth_store";
import { RecordsStore } from "./records_store";
import { ToastStore } from "./toast_store";

const log = getLogger(["stores", "AppStore"]);

export class AppStore {
  authStore: AuthStore;
  /**
   * Repositories to CRUD data from API
   */
  repos: {
    users: UserApiRepository;
    records: RecordsApiRepository;
    userSettings: UserSettingsApiRepository;
    cvs: CvsApiRepository;
    cvVersions: CvVersionApiRepository;
    jobs: JobsApiRepository
  };
  /**
   * Services to share store asnd manipulate data between containers
   */
  stores: {
    toastStore: ToastStore;
    recordsStore: RecordsStore;
  };

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authStore = new AuthStore({ appStore: this });

    this.stores = {
      recordsStore: new RecordsStore({ appStore: this }),
      toastStore: new ToastStore(),
    };

    this.repos = {
      users: new UserApiRepository(),
      records: new RecordsApiRepository(),
      userSettings: new UserSettingsApiRepository(),
      cvs: new CvsApiRepository(),
      cvVersions: new CvVersionApiRepository(),
      jobs: new JobsApiRepository()
    };
  }
}
