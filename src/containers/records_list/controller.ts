import { makeAutoObservable } from "mobx";

import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class RecordsListController {
  private appStore: AppStore;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get isLoading() {
    const { recordsStore } = this.appStore.stores;
    return !recordsStore.state.isInitialized || recordsStore.state.isLoading;
  }

  get data() {
    const { recordsStore } = this.appStore.stores;
    return recordsStore.data;
  }

  async load() {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.loadCacheIfNeeded();
  }

  async loadNextPage() {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.loadNextPage();
  }

  delete = async (id: number) => {
    const { recordsStore } = this.appStore.stores;
    await recordsStore.delete(id);
  };
}
