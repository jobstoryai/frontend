import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/AppStore";
import { Tree } from "repositories/TreeRepository";

interface Options {
  appStore: AppStore;
}


export class NodeTreeController {
  private appStore: AppStore;

  isLoading = false;
  data: Tree | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(id: number) {
    const { repos } = this.appStore;
    this.isLoading = true;
    const item = await repos.tree.get(id);

    runInAction(() => {
      this.data = item;
      this.isLoading = false;
    });
  }
}
