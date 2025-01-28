import { makeAutoObservable, runInAction } from "mobx";
import { PublicUser } from "repositories/user_repository";
import { AppStore } from "stores/app_store";

interface Options {
  appStore: AppStore;
}

export class WhoamiController {
  private appStore: AppStore;
  isLoading = false;
  data: PublicUser | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    const { repos } = this.appStore;
    this.isLoading = true;

    const user = await repos.users.get("me" as any);

    runInAction(() => {
      this.data = user;
      this.isLoading = false;
    });
  }
}
