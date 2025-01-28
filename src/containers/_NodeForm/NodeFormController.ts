import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/AppStore";
import { Node, NodePayload } from "repositories/NodeRepository";
import debounce from "lodash/debounce";

interface Options {
  appStore: AppStore;
}

interface SearchResultItem {
  label: string;
  value: string;
}

const MIN_SIMILAR_NODES_QUERY_LENGHT = 2

export class NodeFormController {
  private appStore: AppStore;
  isModifying = false;
  isLoading = false;
  data: Node | null = null;
  similarNodes: Node[] = []

  isSearching = false;
  searchResults: SearchResultItem[] = []

  constructor(options: Options) {
    this.appStore = options.appStore;
    this.onGetSimilarNodes = debounce(this.onGetSimilarNodes, 300) as any
    makeAutoObservable(this);
  }

  resetData = () => {
    this.data = null;
  }

  async load(id: number) {
    const { repos } = this.appStore;
    this.isLoading = true;
    const item = await repos.node.get(id);

    runInAction(() => {
      this.data = item;
      this.isLoading = false;
    });
  }

  create = async (payload: NodePayload) => {
    const { repos, toastStore } = this.appStore;
    let success = false;

    try {
      this.isModifying = true;
      const item = await repos.node.create(payload);
      toastStore.show("success", `${item.title} has been created`);
      success = true;
    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
    return success;
  };

  update = async (id: number, payload: any) => {
    const { repos, toastStore } = this.appStore;
    let success = false;

    try {
      this.isModifying = true;

      const item = await repos.node.update(id, payload);
      toastStore.show("success", `${item.title} has been updated`);
      success = true;

    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
    return success;
  };


  onSearch = async (query: string) => {
    const { repos } = this.appStore;

    this.isSearching = true;

    const queryParams: Record<string, any> = { q: query }

    if (this.data?.id) {
      queryParams.exclude_ids = String(this.data.id)
    }

    const [items] = await repos.node.list(1, {
      queryParams,
    });

    runInAction(() => {
      this.searchResults = items.map((item) => ({
        label: `[${item.node_type}]: ${item.title}`,
        value: String(item.id),
      }))
      this.isSearching = false;
    })

    return this.searchResults;
  }

  onNodeTagSearch = async (query: string) => {
    const { repos } = this.appStore;
    const queryParams: Record<string, any> = { q: query }

    const [items] = await repos.nodeTag.list(1, {
      queryParams,
    });

    runInAction(() => {
      this.searchResults = items.map((item) => ({
        label: item.title,
        value: String(item.id),
      }))
    })

    return this.searchResults;
  }

  onGetSimilarNodes = async (query: string): Promise<void> => {
    const { repos } = this.appStore;

    // Clear results on too short query
    if (query.length <= MIN_SIMILAR_NODES_QUERY_LENGHT) {
      this.similarNodes = []
      return
    }

    const queryParams: Record<string, any> = { q: query }

    if (this.data?.id) {
      queryParams.exclude_ids = String(this.data.id)
    }

    const [items] = await repos.node.list(1, { queryParams });

    runInAction(() => {
      this.similarNodes = items
    })
  }
}
