import { makeAutoObservable, runInAction } from "mobx";
import { Node } from "repositories/NodeRepository";
import { AppStore } from "stores/AppStore";

interface Options {
  appStore: AppStore;
}

export class LoginPageController {
  private appStore: AppStore
  isLoading = false;
  data: Node | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
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
}
