export interface Paginated<T> {
  count: number
  page: number;
  size: number;
  items: T[];
}
