import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { AppStore } from "stores/AppStore";
import { PAGE_SIZE } from "config";

import { Paginated } from "types";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";

// TODO: add CRF Repository type
interface Repository<Item> {
  get(pk: number, config?: any): Promise<Item>;
  update(pk: number, data: any): Promise<Item>;
  list(
    page: number,
    data: any
  ): Promise<
    [
      Item[],
      {
        count: number;
      }
    ]
  >;
  delete(pk: number): Promise<void>;
}

export class PaginatedListController<Item> {
  protected appStore: AppStore;
  protected getRepository: () => Repository<Item>;

  isLoading = true;

  data: Paginated<Item> = {
    count: 0,
    items: [],
    size: PAGE_SIZE,
    page: 1,
  };

  query: string | null = null;
  orderBy: string | null = null;
  filters: Record<string, string> = {};

  preload?: () => Promise<void>

  constructor(options: { appStore: AppStore }) {
    this.appStore = options.appStore;
    makeObservable(this, {
      data: observable,
      isLoading: observable,
      load: action,
      setPageSize: action,
    });
  }

  load = async (page: number) => {
    this.isLoading = true;
    this.data.items = [];
    this.data.page = page;

    await this.preload?.()

    const queryParams: Record<string, string | number> = {
      page_size: this.data.size,
    };

    if (this.query) {
      queryParams.q = this.query;
    }

    if (this.orderBy) {
      queryParams.ordering = this.orderBy;
    }

    if (!isEmpty(this.filters)) {
      Object.assign(queryParams, this.filters);
    }

    const [items, { count }] = await this.getRepository().list(this.data.page, {
      queryParams,
    });

    runInAction(() => {
      this.data.items = items;
      this.data.count = count;
      this.isLoading = false;
    });
  };

  setPageSize = (size: number) => {
    this.data.size = size;
  };

  setFilters = async (filters: Record<string, string>) => {
    this.filters = omitBy(filters, isNil);
    await this.load(1);
  };

  resetFilters = async () => {
    this.filters = {};
    await this.load(1);
  };

  setQuery = async (query: string) => {
    this.query = query;
    await this.load(1);
  };

  resetQuery = async () => {
    this.query = null;
    await this.load(1);
  };

  setOrdering = (ordering: string) => {
    this.orderBy = ordering;
    this.load(1);
  };

  resetOrdering = async () => {
    this.orderBy = null;
    await this.load(1);
  };

  onDelete = async (id: number) => {
    const repo = this.getRepository();
    if (window.confirm("Do you really want to delete the row?")) {
      await repo.delete(id);
      await this.load(this.data.page);
    }
  };
}
