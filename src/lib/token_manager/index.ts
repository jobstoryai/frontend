import { getLogger } from "lib/logger";
import jwtDecode from "jwt-decode";
import { EventEmitter } from "events";
import { LocalStorageManager } from "./localstorage_manager";

const log = getLogger(["TokenManager"]);

const EVENTS = {
  TOKEN_CLEAR: "TOKEN_CLEAR",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  TOKEN_SET: "TOKEN_SET",
  TOKEN_MANAGER_INITIALIZED: "TOKEN_MANAGER_INITIALIZED",
};

interface StorageManager {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
}

interface Options {
  storageManager?: StorageManager;
  eventEmitter?: EventEmitter;
  accessTokenKey?: string;
  refreshTokenKey?: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export class TokenManager {
  public tokens: Tokens | null = null;
  private tokenExpirationTimer: NodeJS.Timeout | null = null;
  private storageManager: StorageManager;
  private emitter: EventEmitter;
  private accessTokenKey: string;
  private refreshTokenKey: string;

  constructor({
    accessTokenKey = "__at",
    refreshTokenKey = "__rt",
    storageManager = new LocalStorageManager(),
    eventEmitter = new EventEmitter(),
  }: Options = {}) {
    this.storageManager = storageManager;
    this.emitter = eventEmitter;
    this.accessTokenKey = accessTokenKey;
    this.refreshTokenKey = refreshTokenKey;
  }

  public init = () => {
    this.loadTokenFromStorage();
    log("Token manager initialized");
    this.emitter.emit(EVENTS.TOKEN_MANAGER_INITIALIZED);
  };

  private loadTokenFromStorage() {
    log("Looking for previous token");
    const accessToken = this.storageManager.get(this.accessTokenKey);
    const refreshToken = this.storageManager.get(this.refreshTokenKey);

    if (accessToken && refreshToken) {
      log("Previously saved tokens has been found");
      this.setTokens({ accessToken, refreshToken });
    } else {
      log("Previously saved tokens hasn't been found");
    }
  }

  public setTokens({ accessToken, refreshToken }: Tokens) {
    debugger;
    if (
      this.tokens?.accessToken === accessToken &&
      this.tokens?.refreshToken === refreshToken
    ) {
      return;
    }

    this.tokens = { accessToken, refreshToken };

    this.storageManager.set(this.accessTokenKey, accessToken);
    this.storageManager.set(this.refreshTokenKey, refreshToken);

    log("Tokens have been set");

    this.emitter.emit(EVENTS.TOKEN_SET, this.tokens);
    this.tick();
  }

  public getTokens() {
    if (!this.tokens) {
      return null;
    }
    if (this.isTokenExpired()) {
      this.clearTokens();
      this.emitter.emit(EVENTS.TOKEN_EXPIRED);
      return null;
    }
    return this.tokens;
  }

  public clearTokens(silent = false) {
    this.tokens = null;

    this.storageManager.remove(this.accessTokenKey);
    this.storageManager.remove(this.refreshTokenKey);

    if (!silent) {
      this.emitter.emit(EVENTS.TOKEN_CLEAR);
      log("Tokens have been cleared silently");
    }
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      log("Tokens have been cleared");
    }
  }

  private tick() {
    if (!this.tokens) {
      return;
    }

    const decodedToken: any = jwtDecode(this.tokens.accessToken);
    const expirationTime = decodedToken.exp * 1000 - Date.now();

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    if (expirationTime <= 0) {
      log("Token has been expired");
      this.clearTokens();
      this.emitter.emit(EVENTS.TOKEN_EXPIRED);
    } else {
      this.tokenExpirationTimer = setTimeout(() => {
        this.clearTokens();
        this.emitter.emit(EVENTS.TOKEN_EXPIRED);
      }, expirationTime);
    }
  }

  public isTokenExpired() {
    if (!this.tokens) return true;
    const decodedToken: any = jwtDecode(this.tokens.accessToken);
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

  public onTokensSet(callback: (tokens: Tokens) => void) {
    this.emitter.on(EVENTS.TOKEN_SET, callback);
    return this;
  }

  public onTokensLoadFinished(callback: () => void) {
    console.log(callback);
    this.emitter.on(EVENTS.TOKEN_MANAGER_INITIALIZED, callback);
    return this;
  }
}
