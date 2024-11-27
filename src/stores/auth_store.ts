import { makeAutoObservable, runInAction } from "mobx";
import { getLogger } from "lib/logger";
import { AppStore } from "./app_store";
import { TokenManager } from "lib/token_manager";

const log = getLogger(["stores", "AuthStore"]);

interface Props {
  appStore: AppStore;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthStore {
  appStore: AppStore;
  tokens: Tokens | null = null;
  tokenManager: TokenManager;
  isReady = false;

  constructor({ appStore }: Props) {
    log("Initialize AuthStore");
    makeAutoObservable(this);

    this.appStore = appStore;
    this.tokenManager = new TokenManager();

    this.tokenManager
      .onTokensLoadFinished(() => {
        log("Tokens manager initialized");
        this.isReady = true;
      })
      .onTokensSet((tokens) => {
        this.tokens = tokens;
        log(`Token installed: ${JSON.stringify(this.tokens)}`);
        this.postLogin();
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

  setTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    this.tokenManager.setTokens({ accessToken, refreshToken });
  };

  logout = () => {
    this.tokenManager.clearTokens();
  };

  /**
   * Technically, keycloak adapter is responsible for refresh, but if it
   * fails to refresh, accessToken can expire
   */
  setTokenExpiredCallback(callback: () => void) {
    this.tokenManager.onExpire(callback);
  }

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
