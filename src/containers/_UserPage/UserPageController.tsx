import { makeAutoObservable, runInAction } from "mobx";
import Router from "next/router";
import { Profile } from "repositories/ProfileRepository";
import { AppStore } from "stores/AppStore";

interface Options {
  appStore: AppStore;
}

export class UserPageController {
  private appStore: AppStore
  isLoading = false;
  data: Profile | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load(username: string | null) {
    const { repos } = this.appStore;
    this.isLoading = true;

    if (!username) {
      const me = this.appStore.authStore.me;
      Router.replace(`/u/${me?.username}`);
      return
    }

    const item = await repos.profile.get(username as any);

    runInAction(() => {
      this.data = item;
      this.isLoading = false;
    });
  }

  get isEditable() {
    if (this.isLoading) {
      return false;
    }

    const me = this.appStore.authStore.me;
    return me?.username === this.data?.user;
  }
}
