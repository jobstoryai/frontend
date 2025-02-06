import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { UserSettings, UserSettingsPayload } from "repositories/user_settings";

interface Options {
  appStore: AppStore;
}

export class SettingsPageController {
  private appStore: AppStore;
  isLoading = false;
  isUpdating = false;
  data: UserSettings | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  async load() {
    const { repos } = this.appStore;
    this.isLoading = true;

    const res = await repos.userSettings.get("me" as any);

    runInAction(() => {
      this.data = res;
      this.isLoading = false;
    });
  }

  update = async (payload: UserSettingsPayload) => {
    const {
      repos,
      stores: { toastStore },
    } = this.appStore;
    if (!this.data) {
      throw new Error("You need to pull data first to update it");
    }

    this.isUpdating = true;

    try {
      const res = await repos.userSettings.update(this.data.id, payload);

      runInAction(() => {
        this.data = res;
        toastStore.show("success", "Settings has been updated!");
        this.isUpdating = false;
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    }
  };
}
