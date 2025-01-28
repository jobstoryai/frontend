import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/AppStore";
import { Job, JobPayload } from "repositories/JobRepository";

interface Options {
  appStore: AppStore;
}

// interface JobPresentation extends Omit<Job, 'skills'> {
//   skills: number[]
// }

interface SearchResultItem {
  label: string;
  value: string | number;
}

export class JobFormController {
  private appStore: AppStore;
  isModifying = false;
  isLoading = false;
  data: Job | null = null;
  isSearching = false;
  searchResults: SearchResultItem[] = []

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: number) {
    const { repos } = this.appStore;
    this.isLoading = true;
    const item = await repos.job.get(id);

    runInAction(() => {
      this.data = item
      this.isLoading = false;
    });
  }

  create = async (payload: JobPayload) => {
    const { repos, toastStore } = this.appStore;

    try {
      this.isModifying = true;
      const item = await repos.job.create(payload);
      toastStore.show("success", `${item.title} has been created`);
    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
  };

  update = async (id: number, payload: any) => {
    const { repos, toastStore } = this.appStore;

    try {
      this.isModifying = true;

      const item = await repos.job.update(id, payload);
      toastStore.show("success", `${item.title} has been updated`);

    } catch (e) {
      console.log(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isModifying = false;
      });
    }
  };

  onSearch = async (query: string) => {
    const { repos } = this.appStore;

    this.isSearching = true;

    const [items] = await repos.node.list(1, {
      queryParams: {
        q: query
        // TODO: node_type=skill
      }
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
}
