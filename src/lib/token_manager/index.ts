import { EventEmitter } from "events";
import jwtDecode from "jwt-decode";

import { getLogger } from "lib/logger";

import { MayBeAsync } from "types";

import { TokenStore } from "./token_store";

const log = getLogger(["TokenManager"]);

const EVENTS = {
  TOKEN_CLEAR: "TOKEN_CLEAR",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_SET: "TOKEN_SET",
};

interface ITokenStore {
  get(): string | null;
  set(value: string | null): void;
  remove(): void;
}

interface Options {
  tokenStore?: ITokenStore;
  eventEmitter?: EventEmitter;
  accessTokenKey?: string;
  refreshTokenKey?: string;
}

export class TokenManager {
  private token: string | null = null;
  private tokenExpirationTimer: NodeJS.Timeout | null = null;
  private tokenStore: ITokenStore;
  private emitter: EventEmitter;

  constructor({
    tokenStore = new TokenStore(),
    eventEmitter = new EventEmitter(),
  }: Options = {}) {
    this.tokenStore = tokenStore;
    this.emitter = eventEmitter;
  }

  public init = () => {
    this.loadTokenFromStorage();
    log("Token manager initialized");
  };

  private loadTokenFromStorage() {
    log("Looking for previous token");
    const accessToken = this.tokenStore.get();

    if (accessToken) {
      log(`Previously saved token has been found ${accessToken}`);

      if (this.isTokenExpired(accessToken)) {
        log("Previously saved token has been expired");
        this.emitter.emit(EVENTS.TOKEN_EXPIRED);
        return;
      }

      this.setToken(accessToken);
    } else {
      log("Previously saved token not found");
    }
  }

  public setToken(accessToken: string | null) {
    this.tokenStore.set(accessToken);
    this.token = accessToken;
    log(`Token has been set ${accessToken?.slice(0, 20)}...`);

    this.emitter.emit(EVENTS.TOKEN_SET, this.token);
    this.tick();
  }

  public getToken() {
    return this.token;
  }

  public clearToken(silent = false) {
    this.token = null;

    this.tokenStore.remove();

    if (!silent) {
      this.emitter.emit(EVENTS.TOKEN_CLEAR);
      log("Token has been cleared");
    } else {
      log("Token has been cleared silently");
    }

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  private tick() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    if (!this.token) {
      return;
    }

    const decodedToken: any = jwtDecode(this.token);
    const expirationTime = decodedToken.exp * 1000 - Date.now();

    if (expirationTime <= 0) {
      log("Token has been expired");
      this.clearToken();
      this.emitter.emit(EVENTS.TOKEN_EXPIRED);
    } else {
      this.tokenExpirationTimer = setTimeout(() => {
        this.clearToken();
        this.emitter.emit(EVENTS.TOKEN_EXPIRED);
      }, expirationTime);
    }
  }

  public isTokenExpired(token: string) {
    if (!token) return true;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.exp * 1000 < Date.now();
  }

  public onExpire(callback: () => void) {
    this.emitter.on(EVENTS.TOKEN_EXPIRED, callback);
    return this;
  }

  public onClear(callback: () => void) {
    this.emitter.on(EVENTS.TOKEN_CLEAR, callback);
    return this;
  }

  public onTokenSet(callback: (token: string) => MayBeAsync<void>) {
    this.emitter.on(EVENTS.TOKEN_SET, callback);
    return this;
  }
}
