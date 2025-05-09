import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Record, RecordPayload } from "repositories/record_repository";

import { PAGE_SIZE } from "config";

import { Paginated } from "types";

interface Options {
  appStore: AppStore;
}

export class RecordsStore {
  private appStore: AppStore;

  public state = {
    isInitialized: false,
    isLoading: false,
    isCreating: false,
  };

  data: Paginated<Record> = {
    count: 0,
    items: [],
    size: PAGE_SIZE,
    page: 0,
  };

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async loadCacheIfNeeded() {
    if (this.state.isInitialized) {
      return;
    }
    await this.loadNextPage();
    runInAction(() => {
      this.state.isInitialized = true;
    });
  }

  loadNextPage = async () => {
    const { repos } = this.appStore;
    const { page: curPage, count: curCount, size } = this.data;

    const { isInitialized } = this.state;
    const hasMoreRecords = curPage * size < curCount;

    if (isInitialized && !hasMoreRecords) {
      return;
    }

    this.state.isLoading = true;

    const [records, { count }] = await repos.records.list(curPage + 1, {
      queryParams: {
        page_size: this.data.size,
      },
    });

    runInAction(() => {
      this.data.items = [...this.data.items, ...records];
      this.data.count = count;
      this.data.page = curPage + 1;
      this.state.isLoading = false;
    });
  };

  async create(payload: RecordPayload) {
    const { repos, stores } = this.appStore;
    const { onboardingStore } = stores;

    this.state.isCreating = true;
    try {
      const res = await repos.records.create(payload);
      onboardingStore.load();

      runInAction(() => {
        this.data.count = this.data.count + 1;
        this.data.items = [res, ...this.data.items];
      });
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.state.isCreating = false;
      });
    }
  }

  async update(id: number, payload: RecordPayload) {
    const { repos, stores } = this.appStore;
    const { onboardingStore } = stores;

    try {
      this.state.isCreating = true;
      const updatedRecord = await repos.records.update(id, payload);
      onboardingStore.load();

      runInAction(() => {
        const index = this.data.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.data.items[index] = updatedRecord;
        }
        this.state.isCreating = false;
      });
    } catch (e) {
      console.log(e);
    }
  }

  async delete(id: number) {
    const { repos, stores } = this.appStore;
    const { onboardingStore } = stores;
    await repos.records.delete(id);
    onboardingStore.load();

    runInAction(() => {
      this.data.count = this.data.count + 1;
      this.data.items = this.data.items.filter((i) => i.id !== id);
    });
  }
}
