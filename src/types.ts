export interface Paginated<T> {
  count: number;
  page: number;
  size: number;
  items: T[];
}

export type MayBeAsync<T> = T | Promise<T>;
