import { makeAutoObservable, runInAction } from "mobx";

import { AppStore } from "stores/app_store";
import { PublicUserPayload } from "repositories/user_repository";

interface Options {
  appStore: AppStore;
}

export class UserController {
  private appStore: AppStore;
  isLoading = true;
  isUpdating = false;
  data = {
    first_name: "",
    last_name: "",
    about: "",
  };

  constructor(options: Options) {
    this.appStore = options.appStore;
    makeAutoObservable(this);
  }

  get user() {
    const { authStore } = this.appStore;
    return authStore.user;
  }

  get isReady() {
    return this.appStore.authStore.isReady;
  }

  update = async (payload: PublicUserPayload) => {
    const {
      authStore,
      stores: { toastStore },
    } = this.appStore;
    this.isUpdating = true;

    try {
      await authStore.updateUser(payload);
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
