import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { Cv } from "repositories/cv_repository";

import { PAGE_SIZE } from "config";

import { Paginated } from "types";

interface Options {
  appStore: AppStore;
}

export class CvsPageController {
  private appStore: AppStore;
  isLoading = false;
  data: Paginated<Cv> = {
    count: 0,
    items: [],
    size: PAGE_SIZE,
    page: 0,
  };

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(page: number, options = { silent: false }) {
    const { repos } = this.appStore;
    if (!options.silent) {
      this.isLoading = true;
    }

    const [cvs, { count }] = await repos.cvs.list(page);

    runInAction(() => {
      this.data.items = cvs;
      this.data.count = count;
      this.data.page = page;
      this.isLoading = false;
    });
  }

  delete = async (id: number) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    try {
      const confirmed = confirm(
        "Do you really want to delete this CV? This can't be undone",
      );

      if (!confirmed) {
        return;
      }

      await repos.cvs.delete(id);
      runInAction(() => {
        toastStore.show("success", "CV has been deleted!");
        this.load(this.data.page, { silent: true });
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    }
  };
}
