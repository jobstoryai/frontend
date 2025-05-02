import { makeAutoObservable } from "mobx";

import { AppStore } from "stores/app_store";
import { CvPayload } from "repositories/cv_repository";

interface Options {
  appStore: AppStore;
}

export class CvsController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    const { cvsStore } = this.appStore.stores;
    await cvsStore.loadCacheIfNeeded();
  }

  async reload() {
    const { cvsStore } = this.appStore.stores;
    await cvsStore.reload();
  }

  get data() {
    const { cvsStore } = this.appStore.stores;
    return cvsStore.data;
  }

  get state() {
    const { cvsStore } = this.appStore.stores;
    return cvsStore.state;
  }

  get isLoading() {
    const { cvsStore } = this.appStore.stores;
    return !cvsStore.state.isInitialized || cvsStore.state.isLoading;
  }

  get isCreating() {
    const { cvsStore } = this.appStore.stores;
    return cvsStore.state.isCreating;
  }

  delete = async (id: number) => {
    const { cvsStore } = this.appStore.stores;
    await cvsStore.delete(id);
  };

  create = async (payload: CvPayload) => {
    const { cvsStore } = this.appStore.stores;
    await cvsStore.create(payload);
  };

  update = async (id: number, payload: CvPayload) => {
    const { cvsStore } = this.appStore.stores;
    await cvsStore.update(id, payload);
  };
}
