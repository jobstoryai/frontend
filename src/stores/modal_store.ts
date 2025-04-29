import { makeAutoObservable } from "mobx";

import { getLogger } from "lib/logger";
import type { Job } from "repositories/job_repository";
import { Record } from "repositories/record_repository";

import { AppStore } from "./app_store";

const log = getLogger(["stores", "ModalStore"]);

interface State {
  record: {
    enabled: boolean;
    context: {
      selectedJob?: Job["id"] | null;
      data?: Record | null

    } | null;
  };
  job: {
    enabled: boolean;
    context: {
      data: Job | null;
    } | null;
  };
}

export class ModalStore {
  private appStore: AppStore;
  public state: State = {
    record: {
      enabled: false,
      context: null,
    },
    job: {
      enabled: false,
      context: null,
    },
  };

  constructor({ appStore }: { appStore: AppStore }) {
    this.appStore = appStore;
    makeAutoObservable(this);
  }

  openModal = <T extends keyof State>(
    key: T,
    context?: State[T]["context"],
  ) => {
    log(`Open "${key}" with context:"${JSON.stringify(context)}"`);
    this.state[key].enabled = true;
    this.state[key].context = context || null;
  };

  closeModal = <T extends keyof State>(key: T) => {
    log(`Close "${key}"`);
    this.state[key].enabled = false;
    this.state[key].context = null;
  };
}
