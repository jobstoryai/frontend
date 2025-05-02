import { makeAutoObservable } from "mobx";

import { EntityStore } from "lib/crf/entity_store";
import { getLogger } from "lib/logger";
import { Cv, CvPayload, CvsApiRepository } from "repositories/cv_repository";
import {
  CvVersion,
  CvVersionApiRepository,
} from "repositories/cv_version_repsitory";
import {
  Job,
  JobPayload,
  JobsApiRepository,
} from "repositories/job_repository";
import { OnboardingApiRepository } from "repositories/onboarding_repository";
import {
  Record,
  RecordPayload,
  RecordsApiRepository,
} from "repositories/record_repository";
import { UserApiRepository } from "repositories/user_repository";
import { UserSettingsApiRepository } from "repositories/user_settings";

import { PAGE_SIZE } from "config";

import { AuthStore } from "./auth_store";
import { JobsStore } from "./jobs_store";
import { ModalStore } from "./modal_store";
import { OnboardingStore } from "./onboarding_store";
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
    jobs: JobsApiRepository;
    onboarding: OnboardingApiRepository;
  };
  /**
   * Services to share store asnd manipulate data between containers
   */
  stores: {
    toastStore: ToastStore;
    onboardingStore: OnboardingStore;
    modalStore: ModalStore;
    jobsStore: EntityStore<Job, JobPayload>;
    recordsStore: EntityStore<Record, RecordPayload>;
    cvsStore: EntityStore<Cv, CvPayload>;
    cvVersionsStore: EntityStore<CvVersion, any>;
  };

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authStore = new AuthStore({ appStore: this });

    this.repos = {
      users: new UserApiRepository(),
      records: new RecordsApiRepository(),
      userSettings: new UserSettingsApiRepository(),
      cvs: new CvsApiRepository(),
      cvVersions: new CvVersionApiRepository(),
      jobs: new JobsApiRepository(),
      onboarding: new OnboardingApiRepository(),
    };

    this.stores = {
      toastStore: new ToastStore(),
      onboardingStore: new OnboardingStore({ appStore: this }),
      modalStore: new ModalStore({ appStore: this }),
      jobsStore: new EntityStore({
        // @ts-ignore
        repository: this.repos.jobs,
        pageSize: 100,
      }),
      recordsStore: new EntityStore({
        // @ts-ignore
        repository: this.repos.records,
        pageSize: 100,
      }),
      cvsStore: new EntityStore({
        // @ts-ignore
        repository: this.repos.cvs,
        pageSize: 20,
      }),
      cvVersionsStore: new EntityStore({
        // @ts-ignore
        repository: this.repos.cvVersions,
        pageSize: 20,
      }),
    };
    this.bindStores();
  }

  bindStores = () => {
    this.stores.recordsStore.emitter.on("created", (record: Record) => {
      // Update job when new records are created
      const job = this.stores.jobsStore.data.items.find(
        (job) => job.id === record.job?.id,
      );
      if (job) {
        job.records += 1;
      }

      this.stores.onboardingStore.state.records += 1;
    });

    this.stores.jobsStore.emitter.on("created", () => {
      // Refetch onboarding state
      this.stores.onboardingStore.load();
    });

    this.stores.cvsStore.emitter.on("created", () => {
      // Refetch onboarding state
      this.stores.onboardingStore.load();
    });

    this.stores.cvVersionsStore.emitter.on("created", () => {
      // Refetch onboarding state
      this.stores.onboardingStore.load();
    });

    this.stores.jobsStore.emitter.on("deleted", () => {
      // Clean up records after job was deleted
      this.stores.recordsStore.reload();
      // Refetch onboarding state
      this.stores.onboardingStore.load();
    });
  };
}
