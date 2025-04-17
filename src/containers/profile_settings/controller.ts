import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { PublicUserPayload } from "repositories/user_repository";
import { UserSettings, UserSettingsPayload } from "repositories/user_settings";

interface Options {
  appStore: AppStore;
}

export class ProfileSettingsController {
  private appStore: AppStore;
  isLoading = true;
  isUpdating = false;

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get user() {
    const { authStore } = this.appStore;
    return authStore.user;
  }

  update = async (payload: PublicUserPayload) => {
    const {
      authStore,
      stores: { toastStore },
    } = this.appStore;
    this.isUpdating = true;

    try {
      await authStore.updateUser(payload);
      runInAction(() => {
        toastStore.show("success", "Profile has been updated!");
      });
    } catch (e) {
      console.error(e);
      toastStore.show("error", "Something went wrong");
    } finally {
      runInAction(() => {
        this.isUpdating = false;
      });
    }
  };
}
