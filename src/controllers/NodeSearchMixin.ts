import { makeAutoObservable, runInAction } from "mobx";
import { AppStore } from "stores/AppStore";

interface Options {
  appStore: AppStore;
}

export class NodeSearchService {
  private appStore: AppStore;
  public isSearching = false;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  search = async ({ query, excludeId }: { query: string, excludeId?: number }) => {
    const { repos } = this.appStore;
    this.isSearching = true;

    const queryParams: Record<string, any> = { q: query }

    if (excludeId) {
      queryParams.exclude_ids = String(excludeId)
    }

    const [items] = await repos.node.list(1, { queryParams });

    runInAction(() => {
      this.isSearching = false;
    })

    return items;
  }

}
