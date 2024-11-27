import debug from "debug";
import { makeAutoObservable, runInAction } from "mobx";
import { destroyCookie, parseCookies } from "nookies";

import { AppStore } from "stores/AppStore";
import { setCookieToken } from "lib/setCookieToken";
import { MeDTO } from "repositories/apis/authApi";

import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "config";


const log = debug("app:stores:AuthStore");

interface Opts {
  appStore: AppStore;
}

export class AuthStore {
  tokens: { access: string, refresh: string } | null;
  isLoading = false;
  me: MeDTO | null;
  appStore: AppStore;

  constructor(opts: Opts) {
    log("Create AuthStore");
    this.tokens = null;
    this.appStore = opts.appStore;

    const [access, refresh] = this.getCookies()

    if (refresh && access) {
      log("Initialize with `initialData`: %o", { refresh, access });
      this.tokens = { refresh, access };
      this.loadUser()
    }
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return Boolean(this.tokens);
  }

  async loadUser() {
    const { authApi } = this.appStore;
    this.isLoading = true;
    const me = await authApi.getMe()
    runInAction(() => {
      this.me = me
      this.isLoading = false;
    })
  }

  getCookies = () => {
    const {
      [REFRESH_TOKEN_COOKIE_NAME]: refresh,
      [ACCESS_TOKEN_COOKIE_NAME]: access,
    } = parseCookies();

    return [access, refresh]
  }


  getTokens = () => this.tokens;

  resetTokens = () => {
    this.tokens = null;
  };

  async login(credentials: { username: string, password: string }) {
    log("Start getting tokens from credentials");
    const { authApi } = this.appStore;

    try {
      const res = await authApi.getTokens(credentials);

      setCookieToken(REFRESH_TOKEN_COOKIE_NAME, res.refresh);
      setCookieToken(ACCESS_TOKEN_COOKIE_NAME, res.access);
      
      const me = await authApi.getMe()

      runInAction(() => {
        this.tokens = res;
        this.me = me
        this.isLoading = false;
      })

      log("Tokens have been successfully received from credentials");
      return;
    } catch (err) {
      this.tokens = null;
      throw err;
    }
  }

  logout() {
    destroyCookie(null, REFRESH_TOKEN_COOKIE_NAME);
    destroyCookie(null, ACCESS_TOKEN_COOKIE_NAME);

    window.location.reload();
  }

  getMe = async () => {
    const { authApi } = this.appStore;
    return authApi.getMe()
  }
}

