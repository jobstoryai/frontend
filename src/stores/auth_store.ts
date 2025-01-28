import { makeAutoObservable, runInAction } from "mobx";
import { getLogger } from "lib/logger";
import { AppStore } from "./app_store";
import { TokenManager } from "lib/token_manager";
import { PublicUser } from "repositories/user_repository";

const log = getLogger(["stores", "AuthStore"]);

interface Props {
  appStore: AppStore;
}

export class AuthStore {
  appStore: AppStore;
  token: string | null = null;
  user: PublicUser | null = null;
  tokenManager: TokenManager;
  isReady = false;

  constructor({ appStore }: Props) {
    log("Initialize");
    makeAutoObservable(this);

    this.appStore = appStore;
    this.tokenManager = new TokenManager();

    this.tokenManager
      .onTokenSet((token: string) => {
        this.token = token;
        log(`Token installed: ${token.slice(0, 20)}...`);
      })
      .onClear(() => {
        log("Token uninstalled");
        this.postLogout();
      })
      .onExpire(() => {
        log("Token has been expired");
        this.postLogout();
      })
      .init();
  }

  setToken = (token: string) => {
    this.tokenManager.setToken(token);
  };

  logout = () => {
    this.tokenManager.clearToken();
  };

  setTokenExpiredCallback(callback: () => void) {
    this.tokenManager.onExpire(callback);
  }

  pullUser = async () => {
    const { repos } = this.appStore;

    const user = await repos.users.get("me" as any);
    runInAction(() => {
      this.user = user;
      console.log(this.user);
    });
  };

  private async postLogin() {
    log("Login is not implemented");
    // TODO: (re)load user data
    //await this.appStore.meStore.load();
  }

  private async postLogout() {
    log("Logout is not implemented");
    //await this.tokenManager.clearToken(true);
    //this.appStore.meStore.reset();
    //router.replace("/auth");
  }
}
