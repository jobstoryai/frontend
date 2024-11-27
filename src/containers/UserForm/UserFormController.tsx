import { NodeSearchService } from "controllers/NodeSearchMixin";
import { makeAutoObservable, runInAction } from "mobx";
import Router from "next/router";
import { Profile } from "repositories/ProfileRepository";
import { AppStore } from "stores/AppStore";

interface Options {
  appStore: AppStore;
}

export class UserFormController {
  private appStore: AppStore;
  private nodeSearchService: NodeSearchService;
  isLoading = false;
  isModifying = false;
  data: Profile | null = null;

  constructor(options: Options) {
    this.appStore = options.appStore;
    this.nodeSearchService = new NodeSearchService(options);
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

  onUpdate = async (user: string, payload: any) => {
    const { repos, toastStore } = this.appStore;
    let success = false;

    try {
      this.isModifying = true;

      const item = await repos.profile.update(user as any, payload);
      toastStore.show("success", `Your profile has been updated`);
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
  }

  onSearch = async (query: string) => {
    const items = await this.nodeSearchService.search({
      query,
      // excludeId: this.data?.id,
    });

    return items.map((item) => ({
      label: `[${item.node_type}]: ${item.title}`,
      value: String(item.id),
    }));
  }
}
