import { PAGE_SIZE } from "config";
import { makeAutoObservable, runInAction } from "mobx";
import { Job } from "repositories/JobRepository";
import { Node } from "repositories/NodeRepository";
import Router from "next/router";
import { AppStore } from "stores/AppStore";
import { Paginated } from "types";

interface Options {
  appStore: AppStore;
}

// TODO:
interface QueryParams {
  salary_min?: number | null;
  salary_max?: number | null;
  salary_type?: "M" | "A" | null;
  currency?: string | null;
  skills?: number[] | null;
}

export interface InitialState extends QueryParams {
  // pass
}

export class SearchResultsPageController {
  private appStore: AppStore;
  isLoading = false;
  isInitialized = false;
  initialSkills: { label: string; value: number }[];
  data: Paginated<Job> = {
    count: 0,
    items: [],
    size: PAGE_SIZE,
    page: 1,
  };

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  load = async (
    page = 1,
    queryParams: QueryParams = {},
  ) => {
    const { repos } = this.appStore;
    this.isLoading = true;
    this.isInitialized = true;
    const DEFAULT_QUERY_PARAMS = {
      ordering: "-score",
    }

    const qp = this.processQueryParams(queryParams);
    const [items, { count }] = await repos.job.list(page, { queryParams: { ...qp, ...DEFAULT_QUERY_PARAMS }});

    runInAction(() => {
      this.data.items = items;
      this.data.count = count;
      this.isLoading = false;
    });
  };

  setPageSize = (size: number) => {
    this.data.size = size;
  };

  private processQueryParams(
    queryParams: QueryParams,
  ): Record<string, string | number | boolean> {
    const retvar = Object.keys(queryParams).reduce((acc, key) => {
      if (queryParams[key as keyof QueryParams]) {
        // @ts-ignore
        acc[key] = queryParams[key];
      }
      return acc;
    }, {});

    if (queryParams.skills) {
      // @ts-ignore
      retvar.skills = queryParams.skills.join(",");
    }

    return retvar;
  }

  // TODO: Use node search service
  searchNodes = async (query: string) => {
    const { repos } = this.appStore;
    const queryParams: Record<string, any> = { q: query };

    const [items] = await repos.node.list(1, {
      queryParams,
    });

    return items.map((item) => ({
      label: `[${item.node_type}]: ${item.title}`,
      value: String(item.id),
    }));
  };
}
