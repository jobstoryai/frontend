import { makeAutoObservable, runInAction } from "mobx";
import { EventEmitter } from "tseep";

import { getLogger } from "lib/logger";

import { Paginated } from "types";

interface Repository<T, Payload> {
  get: (id: number | string, options?: any) => Promise<T>;
  list: (
    page: number,
    options?: any,
  ) => Promise<[T[], { count: number } | any]>;
  create: (payload: Payload) => Promise<T>;
  update: (id: number | string, payload: Payload) => Promise<T>;
  delete: (id: number | string) => Promise<void>;
}

interface EntityStoreOptions<T, Payload> {
  repository: Repository<T, Payload>;
  pageSize?: number;
}

export class EntityStore<T extends { id: number | string }, Payload> {
  public emitter = new EventEmitter();

  data: Paginated<T> = {
    count: 0,
    items: [],
    size: this.options.pageSize || 10,
    page: 0,
  };

  state = {
    isInitialized: false,
    isLoading: false,
    isLoadingOne: false,
    isCreating: false,
    isUpdating: false,
  };

  constructor(private options: EntityStoreOptions<T, Payload>) {
    makeAutoObservable(this);
  }

  loadCacheIfNeeded = async () => {
    if (this.state.isInitialized) return;
    await this.reload();
    runInAction(() => {
      this.state.isInitialized = true;
    });
  };

  loadNextPage = async () => {
    const { page, size, count, items } = this.data;
    const { repository } = this.options;

    const { isInitialized } = this.state;
    const hasMoreRecords = page * size < count;

    if (isInitialized && !hasMoreRecords) {
      return;
    }

    this.state.isLoading = true;

    try {
      const [newItems, meta] = await repository.list(page + 1, {
        queryParams: { page_size: size },
      });

      runInAction(() => {
        this.data.items = [...items, ...newItems];
        this.data.count = meta.count;
        this.data.page = page + 1;
      });

      this.emitter.emit("loaded", this.data.items);
    } finally {
      runInAction(() => {
        this.state.isLoading = false;
      });
    }
  };

  reload = async () => {
    try {
      const [newItems, meta] = await this.options.repository.list(1, {
        queryParams: { page_size: this.data.size },
      });

      runInAction(() => {
        this.data.items = newItems;
        this.data.count = meta.count;
        this.data.page = 1;
      });

      this.emitter.emit("reloaded", this.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  get = async (id: number): Promise<T | undefined> => {
    const cached = this.data.items.find((item) => item.id === id);
    if (cached) return cached;

    this.state.isLoadingOne = true;
    try {
      const item = await this.options.repository.get(id);
      if (!item) return;
      this.emitter.emit("loadedOne", item);
      return item;
    } finally {
      runInAction(() => {
        this.state.isLoadingOne = false;
      });
    }
  };

  create = async (payload: Payload) => {
    const { repository } = this.options;
    this.state.isCreating = true;

    try {
      const item = await repository.create(payload);
      runInAction(() => {
        this.data.items.unshift(item);
        this.data.count += 1;
      });
      this.emitter.emit("created", item);
      return item;
    } finally {
      runInAction(() => {
        this.state.isCreating = false;
      });
    }
  };

  update = async (id: number, payload: Payload) => {
    const { repository } = this.options;
    this.state.isUpdating = true;

    try {
      const updatedItem = await repository.update(id, payload);
      runInAction(() => {
        const index = this.data.items.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.data.items[index] = updatedItem;
        }
      });
      this.emitter.emit("updated", updatedItem);
      return updatedItem;
    } finally {
      runInAction(() => {
        this.state.isUpdating = false;
      });
    }
  };

  delete = async (id: number) => {
    const { repository } = this.options;
    await repository.delete(id);
    runInAction(() => {
      this.data.items = this.data.items.filter((item) => item.id !== id);
      this.data.count -= 1;
    });
    this.emitter.emit("deleted", id);
  };
}
