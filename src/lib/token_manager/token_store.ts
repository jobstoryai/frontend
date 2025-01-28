import { ACCESS_TOKEN_STORAGE_KEY } from "config";

export class TokenStore {
  get() {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  }

  set(value: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, value);
  }

  remove() {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  }
}
