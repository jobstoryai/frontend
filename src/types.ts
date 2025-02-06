export interface Paginated<T> {
  count: number;
  page: number;
  size: number;
  items: T[];
}

export type MayBeAsync<T> = T | Promise<T>;

interface ISerializer {
  fromDTO: (...args: any[]) => any;
  toDTO: (...args: any[]) => any;
}

export type GetDomainModel<S extends ISerializer> = ReturnType<S["fromDTO"]>;
export type GetRequestPayload<S extends ISerializer> = Parameters<
  S["toDTO"]
>[0];
