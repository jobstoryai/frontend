import { getLogger } from "lib/logger";
import { makeAutoObservable } from "mobx";
import { PublicUserApiRepository } from "repositories/UserRepository";
import { AuthApi } from "repositories/apis/authApi";

import { ToastStore } from "stores/ToastStore";
import { AuthStore } from "stores/AuthStore";
import { NodeRepository } from "repositories/NodeRepository";
import { JobRepository } from "repositories/JobRepository";
import { TreeRepository } from "repositories/TreeRepository";
import { ProfileRepository } from "repositories/ProfileRepository";
import { NodeTagRepository } from "repositories/NodeTagsRepository";

const log = getLogger(["stores", "AppStore"]);

export class AppStore {
  public authApi: AuthApi;
  public authStore: AuthStore;

  public toastStore: ToastStore;

  repos: {
    publicUser: PublicUserApiRepository;
    node: NodeRepository;
    job: JobRepository;
    tree: TreeRepository;
    profile: ProfileRepository;
    nodeTag: NodeTagRepository
  };

  constructor() {
    log("initialize AppStore");
    makeAutoObservable(this);

    this.authApi = new AuthApi();
    this.toastStore = new ToastStore();
    this.authStore = new AuthStore({
      appStore: this,
    });

    this.repos = {
      publicUser: new PublicUserApiRepository(),
      node: new NodeRepository(),
      job: new JobRepository(),
      tree: new TreeRepository(),
      profile: new ProfileRepository(),
      nodeTag: new NodeTagRepository(),
    };
  }
}
